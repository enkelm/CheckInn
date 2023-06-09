using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckInn.Services.Users;
using CheckInn.Util.AuthPolicy;
using Entities.DTOs.DTOs.User;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<bool>> Register([FromForm] UserDTO userDto)
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
        [Route("register-super_admin")]
        [Authorize(Policy = AuthPolicy.SuperAdminOnly)]
        public async Task<ActionResult<bool>> RegisterSuperAdmin([FromForm] UserDTO userDto)
        {
            try
            {
                return await _userService.RegisterAdmin(userDto);
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
                return Accepted(await _userService.Login(userDto));

            }
            catch (Exception e)
            {
                _logger.LogError(e, "Login Failed!");
                if(e.Message == "Wrong Credentials!") return Unauthorized();
                return BadRequest();
            }
        }

    }
}
