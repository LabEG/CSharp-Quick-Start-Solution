using System.ComponentModel.DataAnnotations;

namespace SampleSolution.ServerCore.Models.ViewModels.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Login { get; set; } // for test, delete it later

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}