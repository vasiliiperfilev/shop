namespace api.Models.User;

using System.ComponentModel.DataAnnotations;

public class AuthenticateRequest
{
    [Required]
    [MaxLength(25,
        ErrorMessage = "Incorrect login/password")]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [MaxLength(25,
        ErrorMessage = "Incorrect login/password")]
    public string Password { get; set; } = null!;
}
