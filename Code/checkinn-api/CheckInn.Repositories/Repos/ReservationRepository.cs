using CheckInn.Repositories.Interfaces;
using Entities;
using Entities.Entities;

namespace CheckInn.Repositories.Repos;

public class ReservationRepository : BaseRepository<Reservations, long>, IReservationsRepository
{
    public ReservationRepository(ApiDbContext db) : base(db)
    {
    }
}