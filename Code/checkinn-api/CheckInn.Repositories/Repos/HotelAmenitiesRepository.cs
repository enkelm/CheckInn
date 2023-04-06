using CheckInn.Repositories.Interfaces;
using Entities;
using Entities.Entities;

namespace CheckInn.Repositories.Repos;

public class HotelAmenitiesRepository : BaseRepository<HotelAmenities, long>, IHotelAmenitiesRepository
{
    public HotelAmenitiesRepository(ApiDbContext db) : base(db)
    {
    }
}