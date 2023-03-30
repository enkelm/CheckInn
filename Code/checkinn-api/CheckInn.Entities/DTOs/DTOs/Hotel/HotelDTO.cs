namespace Entities.DTOs;

public class HotelDTO
{
    public long Id { get; set; }
    public string HotelName { get; set; }
    public string? Description { get; set; }
    public double? Rating { get; set; }
    public int Occupancy { get; set; }
    public string ImageUrl { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
}