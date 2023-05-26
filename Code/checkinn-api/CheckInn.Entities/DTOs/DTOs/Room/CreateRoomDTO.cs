using System.ComponentModel.DataAnnotations;
using Entities.DTOs.DTOs.Room.Amenities;
using Entities.Entities;
using Microsoft.AspNetCore.Http;

namespace Entities.DTOs.DTOs.Room;

public class CreateRoomDTO
{
    private DateTime _defaultBookingTime;

    [Required]
    public long HotelId { get; set; }
    public string Description { get; set; }
    [Required]
    public int Occupancy { get; set; }
    public bool Occupied { get; set; }
    [Required]
    public double PricePerNight { get; set; }
    [Required]
    public DateTime MinimumBookingTime { get; set; }
    public DateTime DefaultBookingTime { get => _defaultBookingTime; set => _defaultBookingTime = value == default ? MinimumBookingTime : value; }
    [Required]
    public RoomType RoomType { get; set; }

    public IEnumerable<string?>? ImagesUrl { get; set; }
    public IEnumerable<IFormFile?>? Images { get; set; }

    public CreateRoomAmenitiesDTO RoomAmenities { get; set; }
}