namespace api.Services;

using api.Models.Order;
using api.Models.User;

public interface IUserService
{
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
    Task<User> Register(RegisterRequest user);
    Task<User> Update(string id, UserUpdateRequest model);
    void Delete(string id);
    Task<Order> AddUserOrder(User user, AddOrderRequest model);
}
