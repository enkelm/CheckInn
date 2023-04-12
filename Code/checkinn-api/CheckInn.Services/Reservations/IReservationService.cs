using Entities.DTOs.DTOs.Reservation;

namespace CheckInn.Services.Reservations;

public interface IReservationService
{
    Task<ReservationDTO> GetByUserId(string id);
    Task<ReservationDTO> Create(CreateReservationDTO reservationDto);
}