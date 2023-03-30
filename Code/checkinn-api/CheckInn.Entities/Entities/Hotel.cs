using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Entities;

public class Hotel : BaseEntity
{
    public string HotelName { get; set; }
    public string? Description { get; set; }
    public double? Rating { get; set; }
    public int Occupancy { get; set; }
    public string ImageUrl { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

}