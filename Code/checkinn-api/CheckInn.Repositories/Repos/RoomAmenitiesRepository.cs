using CheckInn.Repositories.Interfaces;
using Entities;
using Entities.Entities;

namespace CheckInn.Repositories.Repos;

public class RoomAmenitiesRepository : BaseRepository<RoomAmenities, long>, IRoomAmenitiesRepository
{
    public RoomAmenitiesRepository(ApiDbContext db) : base(db)
    {
    }
}