using System.ComponentModel.DataAnnotations;
using Entities.DTOs.DTOs.Room.Amenities;
using Entities.Entities;

namespace Entities.DTOs.DTOs.Room;

public class CreateRoomDTO
{
    [Required]
    public long HotelId { get; set; }
    public string Description { get; set; }
    [Required]
    public int Occupancy { get; set; }
    public bool Occupied { get; set; }
    [Required]
    public double PricePerNight { get; set; }
    [Required]
    public RoomType RoomType { get; set; }
    public string ImagesUrl { get; set; }

    public CreateRoomAmenitiesDTO RoomAmenities { get; set; }
}