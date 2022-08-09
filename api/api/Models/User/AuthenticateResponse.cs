namespace api.Models.User;

using api.Models.Order;

public class AuthenticateResponse
{
    public string Id { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Address { get; set; } = null!;
    public List<Order> Orders { get; set; } = null!;
    public string Token { get; set; } = null!;
} 
