using AutoMapper;
using CheckInn.Repositories.Interfaces;
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
        var hotels = await _hotelRepository.GetAllAsync(new Dictionary<string, string[]?>
        {
            { "HotelAmenities", null },
            { "Rooms", new[] {"RoomAmenities"} }
        });
        return _mapper.Map<IEnumerable<Hotel>, List<HotelDTO>>(hotels);
    }

    public async Task<HotelDTO> GetHotel(long id)
    {
        var hotel = await _hotelRepository.GetById(x => x.Id == id, new Dictionary<string, string[]?> 
            {
                { "HotelAmenities", null },
                { "Rooms", new[] {"RoomAmenities"} } 
            }
        );
        return _mapper.Map<Hotel, HotelDTO>(hotel);
    }

    public async Task<HotelDTO> Create(CreateHotelDTO hotelDto)
    {
        var hotel = _mapper.Map<CreateHotelDTO, Hotel>(hotelDto);
        var result = _hotelRepository.Add(hotel);

        var isSaved = await _unitOfWork.SaveAsync();

        if (!isSaved) throw new Exception("Data Not Saved!");

        return _mapper.Map<Hotel, HotelDTO>(result);
    }

    public async Task<bool> Update(UpdateHotelDTO hotelDto)
    {
        var hotel = _mapper.Map<UpdateHotelDTO, Hotel>(hotelDto);

        _hotelRepository.Update(hotel);
        return await _unitOfWork.SaveAsync();
    }

    public async Task<bool> Delete(long id)
    {
        await _hotelRepository.Remove(id);
        return await _unitOfWork.SaveAsync();
    }

    public async Task<bool> IsHotelBooked(long id)
    {
        var hotel = await _hotelRepository.GetById(id);
        return await IsHotelBooked(hotel);
    }

    public async Task<bool> IsHotelBooked(Hotel hotel)
    {
        if (!hotel.FullyBooked) return hotel.FullyBooked;
        
        var reservation = hotel.Reservations.Last();

        if (reservation.EndDate >= DateTime.Now) return hotel.FullyBooked; 
        
        hotel.Occupied -= reservation.Rooms.Sum(x => x.Occupancy);
        foreach (var room in reservation.Rooms) room.Occupied = false;

        await _unitOfWork.SaveAsync();
        return hotel.FullyBooked;
    }
}