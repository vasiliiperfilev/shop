namespace api.Models.User;

public class UserUpdateRequest
{
    public string Email { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
    public string Address { get; set; } = null!;
}
