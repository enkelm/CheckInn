using Entities.DTOs.DTOs.Room;

namespace Entities.DTOs.DTOs.Reservation;

public class ReservationDTO
{
    public string UserId { get; set; }
    public long HotelId { get; set; }
    public bool Approved { get; set; }
    public double TotalPrice { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public ICollection<RoomDTO> Rooms { get; set; }
}