using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs;

public class CreateHotelDTO
{
    [Required]
    [MaxLength(50)]
    public string HotelName { get; set; }
    public string? Description { get; set; }
    public double? Rating { get; set; }
    [Required]
    public int Occupancy { get; set; }
    [Required]
    public string ImageUrl { get; set; }
    [Required]
    public DateTime CreatedDate { get; set; }
    
    public DateTime UpdatedDate { get; set; }
}