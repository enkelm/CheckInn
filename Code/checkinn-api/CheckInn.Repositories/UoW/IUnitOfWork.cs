using Entities;

namespace CheckInn.Repositories.UoW;

public interface IUnitOfWork : IDisposable
{
    ApiDbContext DbContext { get; }
    TRepository GetRepository<TRepository>() where TRepository : class;
    bool Save();
    Task<bool> SaveAsync();
}