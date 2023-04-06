using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs.Amenities;

public class UpdateHotelAmenitiesDTO : CreateHotelAmenitiesDTO
{
    [Required] public long Id { get; set; }
}