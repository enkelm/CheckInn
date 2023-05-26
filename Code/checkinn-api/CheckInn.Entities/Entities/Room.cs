using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Entities.Entities;

public class Room : BaseEntity
{
    public long HotelId { get; set; }
    public virtual Hotel Hotel { get; set; }
    
    public string? Description { get; set; }
    public int Occupancy { get; set; }
    public bool Occupied { get; set; }
    public double PricePerNight { get; set; }
    public DateTime MinimumBookingTime { get; set; }
    public DateTime DefaultBookingTime { get; set; }
    public RoomType RoomType { get; set; }
    public string ImagesUrl { get; set; }
    public virtual RoomAmenities RoomAmenities { get; set; }
}

public enum RoomType
{
    Bedroom = 0,
    Livingroom = 1,
    Studio = 2,
    EntireHotel = 3
}