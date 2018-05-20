using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SampleSolution.ServerCore.DbContexts;
using SampleSolution.ServerCore.IServices;
using SampleSolution.ServerCore.Models.ViewModels.ManageViewModels;

namespace SampleSolution.Backend.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/accountmanage")]
    public class AccountManageController : Controller
    {
        private readonly UserManager<AuthUser> userManager;
        private readonly SignInManager<AuthUser> signInManager;
        private readonly IEmailSenderService emailSender;
        private readonly ILogger logger;
        private readonly UrlEncoder urlEncoder;

        public AccountManageController(
            UserManager<AuthUser> userManager,
            SignInManager<AuthUser> signInManager,
            IEmailSenderService emailSender,
            ILogger<AccountManageController> logger,
            UrlEncoder urlEncoder)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.emailSender = emailSender;
            this.logger = logger;
            this.urlEncoder = urlEncoder;
        }

        [HttpPost("verifyemail")]
        public async Task<IActionResult> SendVerificationEmail([FromBody]IndexViewModel model)
        {
            if (this.ModelState.IsValid)
            {
                AuthUser user = await this.userManager.GetUserAsync(this.User);
                if (user == null)
                {
                    return NotFound($"Unable to load user with ID '{this.userManager.GetUserId(this.User)}'.");
                }

                string code = await this.userManager.GenerateEmailConfirmationTokenAsync(user);
                string email = user.Email;
                await this.emailSender.SendEmailAsync(email, "Регистрация", "Подтверждение");

                return Ok("Verification email sent. Please check your email.");
            }
            return BadRequest(this.ModelState);
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            if (this.ModelState.IsValid)
            {
                AuthUser user = await this.userManager.GetUserAsync(this.User);
                if (user == null)
                {
                    return NotFound($"Unable to load user with ID '{this.userManager.GetUserId(this.User)}'.");
                }

                IdentityResult changePasswordResult = await this.userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                if (!changePasswordResult.Succeeded)
                {
                    return BadRequest(changePasswordResult);
                }

                await this.signInManager.SignInAsync(user, isPersistent: false);
                this.logger.LogInformation("User changed their password successfully.");

                return Ok("Your password has been changed.");
            }
            return BadRequest(this.ModelState);
        }

        [HttpPost("setpassword")]
        public async Task<IActionResult> SetPassword([FromBody]SetPasswordViewModel model)
        {
            if (this.ModelState.IsValid)
            {
                AuthUser user = await this.userManager.GetUserAsync(this.User);
                if (user == null)
                {
                    throw new ApplicationException($"Unable to load user with ID '{this.userManager.GetUserId(User)}'.");
                }

                IdentityResult addPasswordResult = await this.userManager.AddPasswordAsync(user, model.NewPassword);
                if (!addPasswordResult.Succeeded)
                {
                    return this.BadRequest(addPasswordResult);
                }

                await this.signInManager.SignInAsync(user, isPersistent: false);

                return Ok("Your password has been set.");
            }
            return BadRequest(this.ModelState);
        }

        [HttpPost("linklogin")]
        public async Task<IActionResult> LinkLogin(string provider)
        {
            // Clear the existing external cookie to ensure a clean login process
            await this.HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            // Request a redirect to the external login provider to link a login for the current user
            AuthenticationProperties properties = this.signInManager
                .ConfigureExternalAuthenticationProperties(provider, "", this.userManager.GetUserId(this.User));
            return new ChallengeResult(provider, properties);
        }

        [HttpPost("removelogin")]
        public async Task<IActionResult> RemoveLogin([FromBody]RemoveLoginViewModel model)
        {
            if (this.ModelState.IsValid)
            {
                AuthUser user = await this.userManager.GetUserAsync(this.User);
                if (user == null)
                {
                    return BadRequest($"Unable to load user with ID '{this.userManager.GetUserId(this.User)}'.");
                }

                IdentityResult result = await this.userManager
                    .RemoveLoginAsync(user, model.LoginProvider, model.ProviderKey);
                if (!result.Succeeded)
                {
                    return BadRequest($"Unexpected error occurred removing external login for user with ID '{user.Id}'.");
                }

                await this.signInManager.SignInAsync(user, isPersistent: false);
                return Ok("The external login was removed.");
            }
            return BadRequest(this.ModelState);
        }

        [HttpPost("disable2fa")]
        public async Task<IActionResult> Disable2fa()
        {
            AuthUser user = await this.userManager.GetUserAsync(this.User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{this.userManager.GetUserId(this.User)}'.");
            }

            IdentityResult disable2faResult = await this.userManager.SetTwoFactorEnabledAsync(user, false);
            if (!disable2faResult.Succeeded)
            {
                return BadRequest($"Unexpected error occured disabling 2FA for user with ID '{user.Id}'.");
            }

            this.logger.LogInformation("User with ID {UserId} has disabled 2fa.", user.Id);
            return Ok($"User with ID {user.Id} has disabled 2fa.");
        }

        [HttpPost("enableauthenticator")]
        public async Task<IActionResult> EnableAuthenticator([FromBody]EnableAuthenticatorViewModel model)
        {
            if (this.ModelState.IsValid)
            {
                AuthUser user = await this.userManager.GetUserAsync(this.User);
                if (user == null)
                {
                    return NotFound($"Unable to load user with ID '{this.userManager.GetUserId(User)}'.");
                }

                // Strip spaces and hypens
                string verificationCode = model.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

                bool is2faTokenValid = await this.userManager.VerifyTwoFactorTokenAsync(
                    user,
                    this.userManager.Options.Tokens.AuthenticatorTokenProvider,
                    verificationCode
                );

                if (!is2faTokenValid)
                {
                    return BadRequest("Verification code is invalid.");
                }

                await this.userManager.SetTwoFactorEnabledAsync(user, true);
                this.logger.LogInformation("User with ID {UserId} has enabled 2FA with an authenticator app.", user.Id);
                IEnumerable<string> recoveryCodes = await this.userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);

                return Ok(recoveryCodes);
            }
            return BadRequest(this.ModelState);
        }

        [HttpPost("resetauthenticator")]
        public async Task<IActionResult> ResetAuthenticator()
        {
            AuthUser user = await this.userManager.GetUserAsync(this.User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{this.userManager.GetUserId(this.User)}'.");
            }

            await this.userManager.SetTwoFactorEnabledAsync(user, false);
            await this.userManager.ResetAuthenticatorKeyAsync(user);
            this.logger.LogInformation("User with id '{UserId}' has reset their authentication app key.", user.Id);

            return Ok();
        }

        [HttpPost("generaterecoverycodes")]
        public async Task<IActionResult> GenerateRecoveryCodes()
        {
            AuthUser user = await this.userManager.GetUserAsync(this.User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{this.userManager.GetUserId(this.User)}'.");
            }

            if (!user.TwoFactorEnabled)
            {
                return BadRequest($"Cannot generate recovery codes for user with ID '{user.Id}' as they do not have 2FA enabled.");
            }

            IEnumerable<string> recoveryCodes = await this.userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);
            this.logger.LogInformation("User with ID {UserId} has generated new 2FA recovery codes.", user.Id);

            ShowRecoveryCodesViewModel model = new ShowRecoveryCodesViewModel { RecoveryCodes = recoveryCodes.ToArray() };

            return Ok(model);
        }
    }
}