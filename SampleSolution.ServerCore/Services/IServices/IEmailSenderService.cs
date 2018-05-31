using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SampleSolution.ServerCore.Services.IServices
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}