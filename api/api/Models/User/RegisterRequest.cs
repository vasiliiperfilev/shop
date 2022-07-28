namespace api.Models.User;

using api.Helpers;
using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    [MaxLength(25,
        ErrorMessage = "Email max length is 25")]
    [EmailAddress]
    [UniqueEmailValidation]
    public string Email { get; set; } = null!;

    [Required]
    [MaxLength(25,
        ErrorMessage = "Password max length is 25")]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$",
     ErrorMessage = "Password should be minimum 6 characters long, have 1 uppercase letter, 1 special character and 1 number")]
    public string Password { get; set; } = null!;

    [Required]
    [MaxLength(100,
        ErrorMessage = "Address max length is 100")]
    public string Address { get; set; } = null!;
}
