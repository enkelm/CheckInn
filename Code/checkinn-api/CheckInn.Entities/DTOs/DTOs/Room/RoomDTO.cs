using Entities.DTOs.DTOs.Room.Amenities;
using Entities.Entities;

namespace Entities.DTOs.DTOs.Room;

public class RoomDTO
{
    public RoomDTO()
    {
        RoomAmenities = new RoomAmenitiesDTO
        {
            RoomId = Id
        };
    }

    public long Id { get; set; }
    public long HotelId { get; set; }
    public string? Description { get; set; }
    public int Occupancy { get; set; }
    public double PricePerNight { get; set; }
    public RoomType RoomType { get; set; }
    public string ImagesUrl { get; set; }
    public RoomAmenitiesDTO RoomAmenities { get; set; }
}