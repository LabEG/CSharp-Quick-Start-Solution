using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using SampleSolution.ServerCore.Services.IServices;
using Microsoft.Extensions.Options;
using SampleSolution.ServerCore.Models.Settings;

namespace SampleSolution.ServerCore.Services
{
    public class EmailSenderService : IEmailSenderService
    {
        private readonly IOptions<SmtpSettings> smtpSettings;

        public EmailSenderService(IOptions<SmtpSettings> _smtpSettings)
        {
            this.smtpSettings = _smtpSettings;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            string fromEmail = this.smtpSettings.Value.NoReplyEmail;
            MailMessage mailMessage = new MailMessage(fromEmail, email, subject, message);
            mailMessage.IsBodyHtml = true;
            SmtpClient smtpClient = new SmtpClient(this.smtpSettings.Value.SendServer, this.smtpSettings.Value.SendServerPort);
            smtpClient.EnableSsl = true;
            if (this.smtpSettings.Value.NoReplyUseAuth)
            {
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(fromEmail, this.smtpSettings.Value.NoReplyPassword);
            }
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}