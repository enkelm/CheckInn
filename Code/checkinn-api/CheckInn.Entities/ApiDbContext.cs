using Microsoft.EntityFrameworkCore;

namespace Entities;

public class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
    }

}