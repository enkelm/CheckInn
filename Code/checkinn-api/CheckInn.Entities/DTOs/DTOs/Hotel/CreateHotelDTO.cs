using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using Entities.DTOs.Amenities;
using Entities.DTOs.DTOs.Room;

namespace Entities.DTOs;

public class CreateHotelDTO
{
    public CreateHotelDTO()
    {
        HotelAmenities = new CreateHotelAmenitiesDTO();
    }
    [Required]
    [MaxLength(50)]
    public string HotelName { get; set; }
    public string? Description { get; set; }
    [Required]
    public int Occupancy { get; set; }
    public int HotelType { get; set; }
    public IEnumerable<string>? ImageUrl { get; set; }
    public IFormFile? Image { get; set; }
    [Required]
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    [Required] 
    public CreateHotelAmenitiesDTO HotelAmenities { get; set; }
    [Required] 
    public ICollection<CreateRoomDTO> Rooms { get; set; }
}