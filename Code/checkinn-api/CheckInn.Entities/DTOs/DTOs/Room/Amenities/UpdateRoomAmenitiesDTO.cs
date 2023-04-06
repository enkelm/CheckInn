using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs.DTOs.Room.Amenities;

public class UpdateRoomAmenitiesDTO : CreateRoomAmenitiesDTO
{
    [Required] public long Id { get; set; }
}