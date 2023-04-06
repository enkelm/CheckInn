using System.ComponentModel.DataAnnotations;
using Entities.Entities;

namespace Entities.DTOs.DTOs.Room.Amenities;

public class CreateRoomAmenitiesDTO
{
    [Required]
    public long RoomId { get; set; }
    [Required]
    public bool Kitchen { get; set; }
    [Required]
    public bool PrivateBathroom { get; set; }
    [Required]
    public bool Balcony { get; set; }
    [Required]
    public BedType BedType { get; set; }
    [Required]
    public bool TV { get; set; }
}