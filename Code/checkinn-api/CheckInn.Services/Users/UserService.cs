using AutoMapper;
using CheckInn.Services.Auth;
using Entities.DTOs.DTOs.User;
using Entities.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace CheckInn.Services.Users;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ILogger<UserService> _logger;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public UserService(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<UserService> logger, IMapper mapper, IAuthService authService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
        _mapper = mapper;
        _authService = authService;
    }

    public async Task<bool> Register(UserDTO userDto)
    {
        var user = _mapper.Map<User>(userDto);
        user.UserName = userDto.Email;

        if (userDto.Roles.Any(x => x == "SuperAdmin"))
            throw new ArgumentException();

            var result = await _userManager.CreateAsync(user, userDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                _logger.LogError(error.Code);
            }
            return false;
        }

        await _userManager.AddToRolesAsync(user, userDto.Roles);
        
        return true;
    }
    public async Task<bool> RegisterAdmin(UserDTO userDto)
    {
        var user = _mapper.Map<User>(userDto);
        user.UserName = userDto.Email;

        var result = await _userManager.CreateAsync(user, userDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                _logger.LogError(error.Code);
            }
            return false;
        }

        await _userManager.AddToRolesAsync(user, userDto.Roles);
        
        return true;
    }

    public async Task<LoginResponseDTO> Login(LoginUserDTO userDto)
    {
        if (!await _authService.ValidateUser(userDto)) throw new Exception("Wrong Credentials!"); 

            var user = await _userManager.FindByEmailAsync(userDto.Email);

        return new LoginResponseDTO
        {
            Token = await _authService.CreateToken(),
            Role = await _userManager.GetRolesAsync(user),
            UserId = user.Id
        };
    }
}