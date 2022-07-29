namespace api.Controllers;

using Microsoft.AspNetCore.Mvc;
using api.Services.Authorization;
using api.Services;
using api.Models.User;
using AllowAnonymous = System.Web.Http.AllowAnonymousAttribute;
using System.Web;
using api.Models.Order;
using Microsoft.OpenApi.Expressions;
using api.Helpers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(
        IUserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest model)
    {
        model.Email = model.Email.Trim();
        model.Password = model.Password.Trim();
        model.Password = HttpUtility.JavaScriptStringEncode(model.Password);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await _userService.Authenticate(model);
        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest model)
    {
        model.Email = model.Email.Trim();
        model.Password = model.Password.Trim();
        model.Password = HttpUtility.JavaScriptStringEncode(model.Password);
        model.Address = model.Address.Trim();
        model.Address = HttpUtility.JavaScriptStringEncode(model.Address);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await _userService.Register(model);
        return Ok(new { message = "Registration successful" });
    }

    [HttpPut("self")]
    public async Task<IActionResult> Update([FromBody] UserUpdateRequest model)
    {
        var user = HttpContext.Items["User"] as User ?? throw new AppException("Auth error");
        var updatedUser = await _userService.Update(user.Id, model);
        return Ok(updatedUser);
    }

    [HttpPost("self/orders")]
    public async Task<IActionResult> PostOrder([FromBody] AddOrderRequest model)
    {
        var user = HttpContext.Items["User"] as User ?? throw new AppException("Auth error");
        var order = await _userService.AddUserOrder(user, model);
        return Ok(order);
    }

    [HttpGet("self/orders")]
    public async Task<IActionResult> GetOrders()
    {
        var user = HttpContext.Items["User"] as User ?? throw new AppException("Auth error");
        return Ok(await _userService.GetUserOrders(user));
    }

    [HttpGet("self/orders/{orderId}")]
    public async Task<IActionResult> GetOrder(string orderId)
    {
        var user = HttpContext.Items["User"] as User ?? throw new AppException("Auth error");
        var order = await _userService.GetUserOrderById(user, orderId);
        if (order is not null) {
            return Ok(order);
        }
        return NotFound();
    }
}
