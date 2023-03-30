using Entities;
using Autofac;

namespace CheckInn.Repositories.UoW;

public class UnitOfWork : IUnitOfWork
{
    public IComponentContext _container { get; set; }
    private readonly ApiDbContext _context;

    public ApiDbContext DbContext => _context;
    
    public TRepository GetRepository<TRepository>() where TRepository : class
    {
        return _container.Resolve<TRepository>();
    }

    public bool Save()
    {
        return _context.SaveChanges() > 0;
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}