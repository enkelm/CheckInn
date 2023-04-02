using Entities;

namespace CheckInn.Repositories.UoW;

public interface IUnitOfWork : IDisposable
{
    ApiDbContext DbContext { get; }
    TRepository GetRepository<TRepository>() where TRepository : class;
    TService GetService<TService>() where TService : class;
    bool Save();
    Task<bool> SaveAsync();
}