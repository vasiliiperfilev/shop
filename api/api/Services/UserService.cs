namespace api.Services;

using api.Dao;
using api.Helpers;
using api.Models.Order;
using api.Models.User;
using AutoMapper;
using BCr = BCrypt.Net;

public interface IUserService
{
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
    Task<AuthenticateResponse> Register(RegisterRequest model);
    Task<User> Update(string id, UserUpdateRequest model);
    void Delete(string id);
    Task<Order> AddUserOrder(User user, AddOrderRequest model);
    List<Order> GetUserOrders(User user);
    Order? GetUserOrderById(User user, string orderId);
}

    public class UserService : IUserService
{
    private readonly IJwtHelper _jwtUtils;
    private readonly IMapper _mapper;
    private readonly IUserDao _userDao;
    private readonly IOrderDao _orderDao;

    public UserService(
        IJwtHelper jwtUtils,
        IMapper mapper,
        IUserDao userDao,
        IOrderDao orderDao)
    {
        _jwtUtils = jwtUtils;
        _mapper = mapper;
        _userDao = userDao;
        _orderDao = orderDao;
    }

    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
    {
        var user = await _userDao.GetByEmail(model.Email);

        if (user == null || !BCr.BCrypt.Verify(model.Password, user.Password))
            throw new AppException("Username or password is incorrect");

        var response = _mapper.Map<User, AuthenticateResponse>(user);
        response.Token = _jwtUtils.GenerateToken(user);
        return response;
    }

    public async Task<AuthenticateResponse> Register(RegisterRequest model)
    {
        var user = _mapper.Map<User>(model);
        user.Password = BCr.BCrypt.HashPassword(model.Password);

        await _userDao.Create(user);
        var response = _mapper.Map<User, AuthenticateResponse>(user);
        response.Token = _jwtUtils.GenerateToken(user);
        return response;
    }

    public async Task<User> Update(string id, UserUpdateRequest model)
    {
        var user = await _userDao.GetById(id);

        if (user is null)
            throw new AppException("Not authorized");

        var isPasswordUpdate = !string.IsNullOrEmpty(model.Password);
        if (isPasswordUpdate)
            user.Password = BCr.BCrypt.HashPassword(model.Password);

        _mapper.Map(model, user);
        await _userDao.Update(id, user);
        return user;
    }

    public void Delete(string id)
    {
        _userDao.Remove(id);
    }

    public async Task<Order> AddUserOrder(User user, AddOrderRequest model)
    {
        model.UserId = user.Id;
        var order = _mapper.Map<Order>(model);
        user.Orders.Add(order);
        await _userDao.Update(user.Id, user);
        return order;
    }

    public List<Order> GetUserOrders(User user)
    {
        return user.Orders;
    }

    public Order? GetUserOrderById(User user, string orderId)
    {
        if (user.Orders.Any((order) => order.Id == orderId))
        {
            return user.Orders.FirstOrDefault((order) => order.Id == orderId);
        }
        return null;
    }
}
