using Entities.Configurations;
using Entities.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Entities;

public class ApiDbContext : IdentityDbContext<User>
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
    }

    public DbSet<Hotel> Hotels { get; set; }
    public DbSet<HotelAmenities> HotelAmenities { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<RoomAmenities> RoomAmenities { get; set; }
    public DbSet<Reservations> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Hotel>().HasData(
            new Hotel()
            {
                Id = 1,
                HotelName = "CheckInn",
                Description = "Dummy description",
                ListingApproved = true,
                ImageUrl = "",
                Occupancy = 10,
                Occupied = 0,
                Rating = 5,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                HotelType = HotelType.House,
            }
        );

        modelBuilder.Entity<HotelAmenities>().HasData(
            new HotelAmenities()
            {
                Id = 1,
                HotelId = 1,
                Parking = true,
                AC = true,
                Pets = true,
                Smoking = true,
                Wifi = true
            }
        );

        modelBuilder.Entity<Room>().HasData(
            new Room()
            {
                Id = 1,
                HotelId = 1,
                Description = "Dummy text",
                Occupancy = 5,
                Occupied = false,
                ImagesUrl = "",
                RoomType = RoomType.Bedroom,
                PricePerNight = 1000,
                
            },
            new Room()
            {
                Id = 2,
                HotelId = 1,
                Description = "Dummy text",
                Occupancy = 5,
                Occupied = false,
                ImagesUrl = "",
                RoomType = RoomType.Livingroom,
                PricePerNight = 1000,
            }
        );

        modelBuilder.Entity<RoomAmenities>().HasData(
            new RoomAmenities()
            {
                Id = 1,
                RoomId = 1,
                Balcony = true,
                Kitchen = false,
                BedType = BedType.Double,
                TV = true,
                PrivateBathroom = true
            },
            new RoomAmenities()
            {
                Id = 2,
                RoomId = 1,
                Balcony = true,
                Kitchen = false,
                BedType = BedType.Couch,
                TV = true,
                PrivateBathroom = true
            }
        );


        modelBuilder.ApplyConfiguration(new RoleConfiguration());
    }
}