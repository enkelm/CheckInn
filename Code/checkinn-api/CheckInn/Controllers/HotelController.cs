using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using CheckInn.Repositories.Interfaces;
using CheckInn.Services.Hotels;
using CheckInn.Util.AuthPolicy;
using Entities.DTOs;
using Entities.DTOs.Amenities;
using Entities.DTOs.DTOs.Room;
using Entities.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckInn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;
        private readonly ILogger<HotelController> _logger;

        public HotelController(IHotelService hotelService, ILogger<HotelController> logger)
        {
            _hotelService = hotelService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelDTO>>> GetHotels()
        {
            try
            {
                return Ok(await _hotelService.GetHotels());
            }
            catch (Exception e)
            {
                _logger.LogError(e,"Failed to get all hotels!");
                return BadRequest(e.Message);
            }
        }
        
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<IEnumerable<HotelDTO>>> GetHotel([FromRoute] long id)
        {
            try
            {
                return Ok(await _hotelService.GetHotel(id));
            }
            catch (Exception e)
            {
                _logger.LogError(e,"Failed to get all hotels!");
                return BadRequest();
            }
        }
        
        [HttpPost]
        public async Task<ActionResult<HotelDTO>> Create([FromBody] CreateHotelDTO hotelDto)
        {
            try
            {
                return Ok(await _hotelService.Create(hotelDto));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to create hotel!");
                return BadRequest();
            }
        }

        [HttpPut]
        [Authorize(Policy = AuthPolicy.ManagerAndAbove)]
        public async Task<ActionResult<bool>> Update([FromBody]UpdateHotelDTO request)
        {
            try
            {
                return Ok(await _hotelService.Update(request));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to update hotel!");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Policy = AuthPolicy.AdminsOnly)]
        public async Task<ActionResult<bool>> Delete([FromRoute] long id)
        {
            try
            {
                return Ok(await _hotelService.Delete(id));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to delete hotel!");
                return BadRequest();
            }
        }
    }
}
