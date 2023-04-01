using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs.DTOs.User;

public class LoginUserDTO
{
    [Required]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [Required]
    [StringLength(15, ErrorMessage = "Your Password is limited from {2} to {1} characters", MinimumLength = 8)]
    public string Password { get; set; }
}