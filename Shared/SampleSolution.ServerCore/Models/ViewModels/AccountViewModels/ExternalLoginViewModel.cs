using System.ComponentModel.DataAnnotations;

namespace SampleSolution.ServerCore.Models.ViewModels.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}