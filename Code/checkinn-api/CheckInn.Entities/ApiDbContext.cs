using Entities.Configurations;
using Entities.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Entities;

public class ApiDbContext : IdentityDbContext<User>
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
    }
    
    public DbSet<Hotel> Hotels { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
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

        modelBuilder.ApplyConfiguration(new RoleConfiguration());
    }
}