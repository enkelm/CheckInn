using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CheckInn.Repositories.Interfaces;
using CheckInn.Repositories.Repos;
using CheckInn.Repositories.UoW;
using Entities.DTOs;
using Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckInn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;


        public HotelsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Update(UpdateHotelDTO request)
        {
            var hotel = _mapper.Map<UpdateHotelDTO, Hotel>(request);
            var hotelRepository = _unitOfWork.GetRepository<HotelRepository>();

            hotelRepository.Update(hotel);
            return await _unitOfWork.SaveAsync();
        }
    }
}
