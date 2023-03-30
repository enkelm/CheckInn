using CheckInn.Repositories.Interfaces;
using Entities;
using Entities.Entities;

namespace CheckInn.Repositories.Repos;

public class HotelRepository : BaseRepository<Hotel, long>, IHotelRepository
{
    public HotelRepository(ApiDbContext db) : base(db)
    {
    }
}