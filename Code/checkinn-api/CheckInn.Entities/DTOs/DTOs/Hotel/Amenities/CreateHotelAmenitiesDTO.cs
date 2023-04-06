using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs.Amenities;

public class CreateHotelAmenitiesDTO
{
    [Required] 
    public long HotelId { get; set; }
    [Required]
    public bool Wifi { get; set; }
    [Required]
    public bool Pets { get; set; }
    [Required]
    public bool Parking { get; set; }
    [Required]
    public bool Smoking { get; set; }
    [Required]
    public bool AC { get; set; }
}