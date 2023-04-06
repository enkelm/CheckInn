using CheckInn.Repositories.Interfaces;
using Entities;
using Entities.Entities;

namespace CheckInn.Repositories.Repos;

public class RoomRepository : BaseRepository<Room, long>, IRoomRepository
{
    public RoomRepository(ApiDbContext db) : base(db)
    {
        
    }
}