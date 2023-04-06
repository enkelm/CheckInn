namespace Entities.Entities;

public class RoomAmenities : BaseEntity
{
    public long RoomId { get; set; }
    public virtual Room Room { get; set; }
    
    public bool Kitchen { get; set; }
    public bool PrivateBathroom { get; set; }
    public bool Balcony { get; set; }
    public BedType BedType { get; set; }
    public bool TV { get; set; }
}

public enum BedType
{
    Single = 0,
    Double = 1,
    Couch = 2
}