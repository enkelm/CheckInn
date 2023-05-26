using AutoMapper;
using CheckInn.Repositories.Interfaces;
using CheckInn.Repositories.UoW;
using CheckInn.Services.Base;
using CheckInn.Services.Util.FileService;
using Entities.DTOs;
using Entities.Entities;
using Microsoft.Extensions.Logging;

namespace CheckInn.Services.Hotels;

public class HotelService : BaseService, IHotelService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<HotelService> _logger;
    private readonly IMapper _mapper;
    private readonly IHotelRepository _hotelRepository;
    private readonly IFileService _fileService;

    public HotelService(IUnitOfWork unitOfWork, ILogger<HotelService> logger, IMapper mapper, IHotelRepository hotelRepository, IFileService fileService) : base(unitOfWork, logger)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _mapper = mapper;
        _hotelRepository = hotelRepository;
        _fileService = fileService;
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
        if (hotelDto.Rooms.Any(room => room.RoomType == RoomType.EntireHotel) && hotelDto.Rooms.Count > 1) 
            throw new Exception("Listing can only have one room");
        
        var path = await _fileService.SaveFile(hotelDto.Image);
        hotelDto.ImageUrl.Append(path);
        
        foreach (var roomDto in hotelDto.Rooms)
        {
            var paths = await _fileService.SaveFiles(roomDto.Images);
            if (paths == null) continue;
            foreach (var s in paths)
            {
                roomDto.ImagesUrl.Append(s);
            }
        }
        
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