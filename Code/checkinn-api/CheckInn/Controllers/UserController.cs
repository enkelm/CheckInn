using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckInn.Services.Users;
using Entities.DTOs.DTOs.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckInn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<bool>> Register([FromBody] UserDTO userDto)
        {
            try
            {
                return await _userService.Register(userDto);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Registration Failed!");
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginUserDTO userDto)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogInformation($"Login Attempt for {userDto.Email}");
                return BadRequest(ModelState);
            }
            
            try
            {
                var response = await _userService.Login(userDto);

                if (response.Equals(new LoginResponseDTO())) return Unauthorized();

                return Accepted(response);

            }
            catch (Exception e)
            {
                _logger.LogError(e, "Login Failed!");
                return BadRequest();
            }
        }

    }
}