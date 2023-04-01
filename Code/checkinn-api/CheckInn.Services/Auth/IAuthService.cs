using Entities.DTOs.DTOs.User;

namespace CheckInn.Services.Auth;

public interface IAuthService
{
    Task<bool> ValidateUser(LoginUserDTO userDto);
    Task<string> CreateToken();
}