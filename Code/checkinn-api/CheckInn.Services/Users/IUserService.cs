using Entities.DTOs.DTOs.User;

namespace CheckInn.Services.Users;

public interface IUserService
{
    Task<bool> Register(UserDTO userDto);
    Task<LoginResponseDTO> Login(LoginUserDTO userDto);
}