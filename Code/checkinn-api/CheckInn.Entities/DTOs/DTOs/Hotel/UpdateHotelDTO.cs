using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs;

public class UpdateHotelDTO : CreateHotelDTO
{
    [Required] public long Id { get; set; }
}