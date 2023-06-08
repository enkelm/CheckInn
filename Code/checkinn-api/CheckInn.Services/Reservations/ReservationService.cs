using AutoMapper;
using CheckInn.Repositories.Interfaces;
using CheckInn.Repositories.UoW;
using CheckInn.Services.Base;
using Entities.DTOs.DTOs.Reservation;
using Hangfire;
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
        var reservation = await _reservationsRepository.GetById(x => x.UserId == id,
            new Dictionary<string, string[]?> { { "Rooms", null } });

        return _mapper.Map<Entities.Entities.Reservations, ReservationDTO>(reservation);
    }

    public async Task<ReservationDTO> Create(CreateReservationDTO reservationDto)
    {
        var hotel = await _hotelRepository.GetById(reservationDto.HotelId);
        var existingReservation = hotel.Reservations.FirstOrDefault(x => x.EndDate <= DateTime.Now);

        if (hotel.FullyBooked && existingReservation != null) throw new Exception("Listing is already booked!");

        var reservation = _mapper.Map<CreateReservationDTO, Entities.Entities.Reservations>(reservationDto);

        foreach (var room in reservation.Rooms)
        {
            if (room.Occupied) throw new Exception("One of the rooms was already booked!");
            room.Occupied = true;
            hotel.Occupied += room.Occupancy;
        }


        var result = _reservationsRepository.Add(reservation);

        return _mapper.Map<Entities.Entities.Reservations, ReservationDTO>(result);
    }

    public async Task<bool> Update(UpdateReservationDTO reservationDto)
    {
        var reservation = _mapper.Map<UpdateReservationDTO, Entities.Entities.Reservations>(reservationDto);
        _reservationsRepository.Update(reservation);
        return await _unitOfWork.SaveAsync();
    }

    public async Task<bool> EndReservation(long id)
    {
        var reservation = await _reservationsRepository.GetById(id);
        return await EndReservation(reservation);
    }

    public async Task<bool> EndReservation(Entities.Entities.Reservations reservation)
    {
        if (reservation != null)
        {
            reservation.hasEnded = true;

            foreach (var room in reservation.Rooms)
            {
                room.Occupied = false;
            }
            _reservationsRepository.Update(reservation);
            return await _unitOfWork.SaveAsync();
        }
        return false;
    }

    public async Task<bool> EndReservationByEndDate(Entities.Entities.Reservations reservation)
    {
        // Check if the current time is later than the end date
        if (DateTime.Now > reservation.EndDate)
        {
            // Execute the end reservation logic
            bool ended = await EndReservation(reservation);

            // If the reservation has ended, return true
            if (ended)
            {
                // Remove the recurring job from Hangfire
                RecurringJob.RemoveIfExists($"endReservation_{reservation.Id}");
                return true;
            }
        }

        return false;
    }
    
    public void ScheduleReservationEndJob(Entities.Entities.Reservations reservation)
    {
        // Schedule a recurring job to run every day at 1 am
        RecurringJob.AddOrUpdate($"endReservation_{reservation.Id}", () => EndReservationByEndDate(reservation), Cron.Daily(1));

        _reservationsRepository.Update(reservation);
        _unitOfWork.Save();
    }

    public async Task<bool> CancelReservation(Entities.Entities.Reservations reservations)
    {
        return false;
    }
}