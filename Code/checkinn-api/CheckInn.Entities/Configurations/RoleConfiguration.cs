using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entities.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole
            {
                Name = "SuperAdmin",
                NormalizedName = "SUPERADMIN"
            },
            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = "Manager",
                NormalizedName = "MANAGER" 
            },
            new IdentityRole
            {
                Name = "Client",
                NormalizedName = "CLIENT"
            },
            new IdentityRole
            {
                Name = "Guest",
                NormalizedName = "GUEST"
            }
            );
    }
}