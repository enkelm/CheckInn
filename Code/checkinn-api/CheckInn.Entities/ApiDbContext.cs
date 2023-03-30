using Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace Entities;

public class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
    }
    
    public DbSet<Hotel> Hotels { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hotel>().HasData(
            new Hotel()
            {
                Id = 1,
                HotelName = "CheckInn",
                Description = "",
                ImageUrl = "",
                Occupancy = 5,
                Rating = 5,
                CreatedDate = DateTime.Now
            }
        );
    }
}