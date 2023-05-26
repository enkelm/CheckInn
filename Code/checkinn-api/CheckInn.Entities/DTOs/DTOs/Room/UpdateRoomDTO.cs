using System.ComponentModel.DataAnnotations;
using Entities.DTOs.DTOs.Room.Amenities;

namespace Entities.DTOs.DTOs.Room;

public class UpdateRoomDTO : CreateRoomDTO
{
    [Required] public long Id { get; set; }
    public UpdateRoomDTO()
    {
        RoomAmenities = new UpdateRoomAmenitiesDTO()
        {
            RoomId = Id
        };
    }
}