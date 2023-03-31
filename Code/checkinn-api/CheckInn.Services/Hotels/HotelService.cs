using AutoMapper;
using CheckInn.Repositories.Interfaces;
using CheckInn.Repositories.Repos;
using CheckInn.Repositories.UoW;
using CheckInn.Services.Base;
using Entities.DTOs;
using Entities.Entities;
using Microsoft.Extensions.Logging;

namespace CheckInn.Services.Hotels;

public class HotelService : BaseService, IHotelService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<HotelService> _logger;
    private readonly IMapper _mapper;
    private IHotelRepository _hotelRepository => _unitOfWork.GetRepository<IHotelRepository>();

    public HotelService(IUnitOfWork unitOfWork, ILogger<HotelService> logger, IMapper mapper) : base(unitOfWork, logger)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
    }


    public async Task<IEnumerable<HotelDTO>> GetHotels()
    {
        var hotels = await _hotelRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<Hotel>, List<HotelDTO>>(hotels);
    }

    public Task<HotelDTO> GetHotel(long id)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> Update(UpdateHotelDTO hotelDto)
    {
        var hotel = _mapper.Map<UpdateHotelDTO, Hotel>(hotelDto);

        _hotelRepository.Update(hotel);
        return await _unitOfWork.SaveAsync();
    }
}