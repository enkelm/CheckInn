using Entities.DTOs.DTOs.Reservation;

namespace CheckInn.Services.Reservations;

public interface IReservationService
{
    Task<ReservationDTO> GetByUserId(string id);
    Task<ReservationDTO> Create(CreateReservationDTO reservationDto);
    Task<bool> EndReservation(long id);
    void ScheduleReservationEndJob(Entities.Entities.Reservations reservation);
    Task<bool> EndReservation(Entities.Entities.Reservations reservations);
    Task<bool> EndReservationByEndDate(Entities.Entities.Reservations reservations);
    Task<bool> CancelReservation(Entities.Entities.Reservations reservations);
}