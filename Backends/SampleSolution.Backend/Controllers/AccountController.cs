using System;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SampleSolution.ServerCore.Controllers.Base;
using SampleSolution.ServerCore.DbContexts;
using SampleSolution.ServerCore.Models.ViewModels.AccountViewModels;
using SampleSolution.ServerCore.Services.IServices;

namespace SampleSolution.Backend.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : BaseController
    {
        private readonly UserManager<AuthUser> userManager;
        private readonly SignInManager<AuthUser> signInManager;
        private readonly IEmailSenderService emailSender;
        private readonly ILogger logger;
        private readonly IConfiguration appSettings;

        public AccountController(
            UserManager<AuthUser> userManager,
            SignInManager<AuthUser> signInManager,
            IEmailSenderService emailSender,
            ILogger<AccountController> logger,
            IConfiguration _appSettings)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.emailSender = emailSender;
            this.logger = logger;
            this.appSettings = _appSettings;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model) // checked
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var result = await this.signInManager
                .PasswordSignInAsync(model.Login, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                this.logger.LogInformation("User logged in.");
                return this.Ok();
            }
            if (result.RequiresTwoFactor)
            {
                this.logger.LogWarning("Requires two factor identification.");
                return this.BadRequest("Requires two factor identification.");
            }
            if (result.IsNotAllowed)
            {
                this.logger.LogWarning("Login is not allowed.");
                return this.BadRequest("Login is not allowed.");
            }
            if (result.IsLockedOut)
            {
                this.logger.LogWarning("User account locked out.");
                return this.BadRequest("User account locked out.");
            }
            else
            {
                return this.BadRequest("Wrong login or password.");
            }
        }

        [AllowAnonymous]
        [HttpPost("login2fa")]
        public async Task<IActionResult> LoginWith2fa([FromBody] LoginWith2faViewModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            AuthUser user = await this.signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{this.userManager.GetUserId(this.User)}'.");
            }

            string authenticatorCode = model.TwoFactorCode.Replace(" ", string.Empty).Replace("-", string.Empty);

            var result = await this.signInManager
                .TwoFactorAuthenticatorSignInAsync(authenticatorCode, model.RememberMe, model.RememberMachine);

            if (result.Succeeded)
            {
                this.logger.LogInformation("User with ID {UserId} logged in with 2fa.", user.Id);
                return Ok();
            }
            else if (result.IsLockedOut)
            {
                this.logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return this.BadRequest($"User with ID {user.Id} account locked out.");
            }
            else
            {
                this.logger.LogWarning("Invalid authenticator code entered for user with ID {UserId}.", user.Id);
                return this.BadRequest("Invalid authenticator code.");
            }
        }

        [AllowAnonymous]
        [HttpPost("recovery")]
        public async Task<IActionResult> LoginWithRecoveryCode([FromBody] LoginWithRecoveryCodeViewModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            var user = await this.signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var recoveryCode = model.RecoveryCode.Replace(" ", string.Empty);

            var result = await this.signInManager.TwoFactorRecoveryCodeSignInAsync(recoveryCode);

            if (result.Succeeded)
            {
                this.logger.LogInformation("User with ID {UserId} logged in with a recovery code.", user.Id);
                return Ok();
            }
            if (result.IsLockedOut)
            {
                this.logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                throw new Exception($"User with ID {user.Id} account locked out.");
            }
            else
            {
                this.logger.LogWarning("Invalid recovery code entered for user with ID {UserId}", user.Id);
                return this.StatusCode(400, "Invalid recovery code entered.");
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model) // checked
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            AuthUser user = new AuthUser { UserName = model.Login, Email = model.Email };
            IdentityResult result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                this.logger.LogInformation($"User {model.Email} created a new account with password.");
                await this.signInManager.SignInAsync(user, isPersistent: false);

                string code = await this.userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                string callbackUrl = Url.Action(
                    "ConfirmEmail",
                    "Account",
                    new { userId = user.Id, code = code },
                    "https",
                    appSettings.GetValue<string>("Host")
                );
                await this.emailSender.SendEmailAsync(
                    model.Email,
                    "Confirm your account",
                    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>."
                );

                return Ok();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [AllowAnonymous]
        [HttpGet("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code) // checked
        {
            AuthUser user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{userId}'.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            IdentityResult result = await this.userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
            {
                return Redirect($"https://{appSettings.GetValue<string>("Host")}/cabinet/");
            }
            else
            {
                return BadRequest("Error confirming your email.");
            }
        }

        [HttpPost("logout")]
        public async Task Logout() // checked
        {
            await this.signInManager.SignOutAsync();
            this.logger.LogInformation("User logged out.");
        }

        [AllowAnonymous]
        [HttpPost("externallogin")]
        public IActionResult ExternalLogin(string provider)
        {
            // Request a redirect to the external login provider.
            var properties = this.signInManager.ConfigureExternalAuthenticationProperties(provider, "");
            return Challenge(properties, provider);
        }

        [AllowAnonymous]
        [HttpPost("externalloginconfirm")]
        public async Task<IActionResult> ExternalLoginConfirmation([FromBody] ExternalLoginViewModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            // Get the information about the user from the external login provider
            ExternalLoginInfo info = await this.signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                throw new ApplicationException("Error loading external login information during confirmation.");
            }
            AuthUser user = new AuthUser { UserName = model.Email, Email = model.Email };
            IdentityResult result = await this.userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                result = await this.userManager.AddLoginAsync(user, info);
                if (result.Succeeded)
                {
                    await this.signInManager.SignInAsync(user, isPersistent: false);
                    this.logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
                    return Ok();
                }
            }

            return BadRequest(this.ModelState);
        }

        [AllowAnonymous]
        [HttpPost("forgot")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model) // checked
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            AuthUser user = await this.userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await this.userManager.IsEmailConfirmedAsync(user)))
            {
                // Don't reveal that the user does not exist or is not confirmed
                return this.BadRequest("User does not exist.");
            }

            // For more information on how to enable account confirmation and password reset please
            // visit https://go.microsoft.com/fwlink/?LinkID=532713
            string code = await this.userManager.GeneratePasswordResetTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            string callbackUrl = $"https://{appSettings.GetValue<string>("Host")}/login/reset?code={code}";

            await this.emailSender.SendEmailAsync(
                model.Email,
                "Reset Password",
               $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>."
            );
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model) // checked
        {
            if (!this.ModelState.IsValid)
            {
                return BadRequest(this.ModelState);
            }

            AuthUser user = await this.userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return this.BadRequest("User does not exist.");
            }

            string code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Code));

            IdentityResult result = await this.userManager.ResetPasswordAsync(user, code, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }

            foreach (IdentityError error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(this.ModelState);
        }
    }
}