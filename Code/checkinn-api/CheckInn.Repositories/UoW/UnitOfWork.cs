using Entities;
using Autofac;

namespace CheckInn.Repositories.UoW;

public class UnitOfWork : IUnitOfWork
{
    public IComponentContext _container { get; set; }
    private readonly ApiDbContext _context;

    public UnitOfWork(IComponentContext container, ApiDbContext context)
    {
        _container = container;
        _context = context;
    }

    public ApiDbContext DbContext => _context;
    
    public TRepository GetRepository<TRepository>() where TRepository : class
    {
        return _container.ResolveOptional<TRepository>();
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