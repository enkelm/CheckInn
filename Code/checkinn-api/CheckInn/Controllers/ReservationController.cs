using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckInn.Services.Reservations;
using Entities.DTOs.DTOs.Reservation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckInn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private IReservationService _reservationService;
        private ILogger<ReservationController> _logger;

        public ReservationController(IReservationService reservationService, ILogger<ReservationController> logger)
        {
            _reservationService = reservationService;
            _logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ReservationDTO>> GetByUserId([FromRoute]string id)
        {
            try
            {
                return await _reservationService.GetByUserId(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to get user's reservation");
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<ReservationDTO>> Create([FromBody] CreateReservationDTO reservationDto)
        {
            try
            {
                return await _reservationService.Create(reservationDto);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Reservation couldn't be created!");
                return BadRequest();
            }
        }
    }
}
