namespace api.Services;

using api.Dao;
using api.Helpers;
using api.Models.Order;
using api.Models.User;
using api.Utils;
using AutoMapper;
using BCr = BCrypt.Net;

public class UserService : IUserService
{
    private readonly IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;
    private readonly IUserDao _userDao;
    private readonly IOrderDao _orderDao;

    public UserService(
        IJwtUtils jwtUtils,
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

    public async Task<User> Register(RegisterRequest model)
    {
        if (await _userDao.GetByEmail(model.Email) is not null)
            throw new AppException("Some fields have errors", "Email", new string[] { "Already taken" });

        var user = _mapper.Map<User>(model);
        user.Password = BCr.BCrypt.HashPassword(model.Password);

        await _userDao.Create(user);
        return user;
    }

    public async Task<User> Update(string id, UserUpdateRequest model)
    {
        var user = await _userDao.GetById(id);

        if (user is null)
            throw new AppException("Email doesn't exist", "Email", new string[] { "Doesn't exist" });

        var duplicateEmail = await _userDao.GetByEmail(model.Email) is not null;
        if (duplicateEmail)
            throw new AppException("Some fields have errors", "Email", new string[] { "Already taken" });

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
        await _orderDao.Create(order);
        await _userDao.Update(user.Id, user);
        return order;
    }
}
