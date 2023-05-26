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
        Occupied = false;
    }

    public long Id { get; set; }
    public long HotelId { get; set; }
    public string? Description { get; set; }
    public int Occupancy { get; set; }
    public bool Occupied { get; set; }
    public double PricePerNight { get; set; }
    public DateTime MinimumBookingTime { get; set; }
    public DateTime DefaultBookingTime { get; set; }
    public RoomType RoomType { get; set; }
    public IEnumerable<string>? ImagesUrl { get; set; }
    public RoomAmenitiesDTO RoomAmenities { get; set; }
}