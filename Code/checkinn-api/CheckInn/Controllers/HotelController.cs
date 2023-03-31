using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CheckInn.Repositories.Interfaces;
using CheckInn.Services.Hotels;
using Entities.DTOs;
using Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckInn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private readonly IHotelService _hotelService;
        


        public HotelController(IHotelService hotelService, ILogger<HotelController> logger)
        {
            _hotelService = hotelService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotelDTO>>> GetAll()
        {
            try
            {
                return Ok(await _hotelService.GetHotels());
            }
            catch (Exception e)
            {
                _logger.LogError(e,"Failed to get all hotels!");
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Update(UpdateHotelDTO request)
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
    }
}
