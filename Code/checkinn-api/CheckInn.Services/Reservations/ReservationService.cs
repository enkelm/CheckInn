using AutoMapper;
using CheckInn.Repositories.Interfaces;
using CheckInn.Repositories.UoW;
using CheckInn.Services.Base;
using Entities.DTOs.DTOs.Reservation;
using Microsoft.Extensions.Logging;

namespace CheckInn.Services.Reservations;

public class ReservationService : BaseService, IReservationService
{
    private IUnitOfWork _unitOfWork { get; set; }
    private IMapper _mapper { get; set; }
    private ILogger<ReservationService> _logger { get; set; }
    private IReservationsRepository _reservationsRepository => _unitOfWork.GetRepository<IReservationsRepository>();
    private IHotelRepository _hotelRepository => _unitOfWork.GetRepository<IHotelRepository>();
    private IRoomRepository _roomRepository => _unitOfWork.GetRepository<IRoomRepository>();
    
    public ReservationService(IUnitOfWork unitOfWork, ILogger logger) : base(unitOfWork, logger)
    {
    }


    public async Task<ReservationDTO> GetByUserId(string id)
    {
        var reservation = await _reservationsRepository.GetById(x => x.UserId == id, new[] { "Rooms" });

        return _mapper.Map<Entities.Entities.Reservations, ReservationDTO>(reservation);
    }

    public async Task<ReservationDTO> Create(CreateReservationDTO reservationDto)
    {
        var reservation = _mapper.Map<CreateReservationDTO, Entities.Entities.Reservations>(reservationDto);
        
        
        var result = _reservationsRepository.Add(reservation);

        return _mapper.Map<Entities.Entities.Reservations, ReservationDTO>(result);
    }
}