using System.ComponentModel.DataAnnotations;

namespace SampleSolution.ServerCore.Models.ViewModels.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}