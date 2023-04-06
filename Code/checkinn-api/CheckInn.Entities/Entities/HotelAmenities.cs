namespace Entities.Entities;

public class HotelAmenities : BaseEntity
{
    public long HotelId { get; set; }
    public virtual Hotel Hotel { get; set; }
    
    public bool Wifi { get; set; }
    public bool Pets { get; set; }
    public bool Parking { get; set; }
    public bool Smoking { get; set; }
    public bool AC { get; set; }
}