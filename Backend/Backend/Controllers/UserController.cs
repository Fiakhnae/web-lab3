using Backend.Contracts;
using Backend.Model.Context;
using Backend.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : Controller
{
    private readonly Context _context;

    public UserController(Context context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.Email)) 
        {
            return BadRequest(new Error(400, "BadRequest", "Email is not valid"));
        }

        if (string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new Error(400, "BadRequest", "Password is not valid"));
        }

        if (string.IsNullOrEmpty(request.Name))
        {
            return BadRequest(new Error(400, "BadRequest", "Name is not valid"));
        }

        if (request.Sex < 0 && request.Sex > 1)
        {
            return BadRequest(new Error(400, "BadRequest", "Sex is not valid"));
        }

        var user = new User()
        {
            Email = request.Email,
            Password = request.Password,
            Name = request.Name,
            Birthday = request.Birthday,
            Sex = request.Sex
        };

        await _context.Users.AddAsync(user);

        _context.SaveChanges();

        return Ok(new { id = user.Id });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email))
        {
            return BadRequest(new Error(400, "BadRequest", "Email is not valid"));
        }

        if (string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new Error(400, "BadRequest", "Password is not valid"));
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user is null) 
        {
            return NotFound(new Error(400, "BadRequest", "No founded user with specified email"));
        }

        if (user.Password != request.Password)
        {
            return BadRequest(new Error(400, "BadRequest", "Password is wrong"));
        }

        return Ok(new { id = user.Id });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(long id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
        {
            return NotFound(new Error(400, "BadRequest", "No founded user with specified id"));
        }

        return Ok(user);
    }
}
