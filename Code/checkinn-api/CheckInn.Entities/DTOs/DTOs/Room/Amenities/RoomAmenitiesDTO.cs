using Entities.Entities;

namespace Entities.DTOs.DTOs.Room.Amenities;

public class RoomAmenitiesDTO
{
    public long Id { get; set; }
    public long RoomId { get; set; }
    public bool Kitchen { get; set; }
    public bool PrivateBathroom { get; set; }
    public bool Balcony { get; set; }
    public BedType BedType { get; set; }
    public bool TV { get; set; }
}