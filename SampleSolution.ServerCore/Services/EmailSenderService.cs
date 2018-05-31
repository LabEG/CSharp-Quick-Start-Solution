using System.Threading.Tasks;
using SampleSolution.ServerCore.Services.IServices;

namespace SampleSolution.ServerCore.Services
{
    public class EmailSenderService : IEmailSenderService
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Task.CompletedTask;
        }
    }
}