namespace Entities.Entities;

public class Reservations : BaseEntity
{
    public string UserId { get; set; }
    public virtual User User { get; set; }
    
    public long HotelId { get; set; }
    public virtual Hotel Hotel { get; set; }

    public bool Approved { get; set; }
    public double TotalPrice { get; set; }
    public bool hasEnded { get; set;}
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public ICollection<Room> Rooms { get; set; }
}