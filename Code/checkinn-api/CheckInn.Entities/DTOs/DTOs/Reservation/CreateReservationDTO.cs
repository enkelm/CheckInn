using System.ComponentModel.DataAnnotations;
using Entities.DTOs.DTOs.Room;

namespace Entities.DTOs.DTOs.Reservation;

public class CreateReservationDTO
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public long HotelId { get; set; }
    [Required]
    public double TotalPrice { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    [Required]
    public ICollection<RoomDTO> Rooms { get; set; }
}