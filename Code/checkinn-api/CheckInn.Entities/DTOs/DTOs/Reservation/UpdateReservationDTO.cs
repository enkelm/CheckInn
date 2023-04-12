using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs.DTOs.Reservation;

public class UpdateReservationDTO : CreateReservationDTO
{
    [Required] public long Id { get; set; }
}