using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Entities;

public class Hotel : BaseEntity
{
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

    public virtual HotelAmenities HotelAmenities { get; set; }

    public ICollection<Room> Rooms { get; set; }
    public ICollection<Reservations> Reservations { get; set; }

}

public enum HotelType
{
    Apartment = 0,
    House = 1
}