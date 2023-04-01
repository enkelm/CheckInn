namespace Entities.DTOs.DTOs.User;

public class LoginResponseDTO
{
    public string Token { get; set; }
    public IList<string> Role { get; set; }
    public string UserId { get; set; }
}