using Entities.DTOs.Amenities;
using Entities.DTOs.DTOs.Room;
using Entities.Entities;

namespace Entities.DTOs;

public class HotelDTO
{
    public HotelDTO()
    {
        HotelAmenities = new HotelAmenitiesDTO
        {
            HotelId = Id
        };
    }
    public long Id { get; set; }
    public string HotelName { get; set; }
    public bool ListingApproved { get; set; }
    public string? Description { get; set; }
    public double? Rating { get; set; }
    public int Occupancy { get; set; }
    public int Occupied { get; set; }
    public HotelType HotelType { get; set; }
    public bool FullyBooked => Occupancy == Occupied;
    public string ImageUrl { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

    public HotelAmenitiesDTO HotelAmenities { get; set; }

    public ICollection<RoomDTO> Rooms { get; set; }

}