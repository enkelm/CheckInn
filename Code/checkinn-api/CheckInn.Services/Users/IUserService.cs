using Entities.DTOs.DTOs.User;

namespace CheckInn.Services.Users;

public interface IUserService
{
    /**
     * <summary>
     * Registers a User asynchronously with roles lower than SuperAdmin.
     * </summary>
     * <param name="userDto">Represents the User to be registered</param>
     * <returns>The <see cref="Task"/> which represents the asynchronous operation,
     * containing a <see cref="bool"/> value which represent whether the operation was successful</returns>
     */
    Task<bool> Register(UserDTO userDto);
    /**
     * <summary>
     * Registers a User asynchronously with any roles.
     * </summary>
     * <param name="userDto">Represents the User to be registered</param>
     * <returns>The <see cref="Task"/> which represents the asynchronous operation,
     * containing a <see cref="bool"/> value which represent whether the operation was successful</returns>
     */
    Task<bool> RegisterAdmin(UserDTO userDto);
    /**
     * <summary>
     * Provides user session information when given correct credentials.
     * </summary>
     * <param name="userDto">Represents the User's credentials</param>
     * <returns>The user sessions information inside a <see cref="LoginResponseDTO"/></returns>
     */
    Task<LoginResponseDTO> Login(LoginUserDTO userDto);
}