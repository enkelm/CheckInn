using System.Linq.Expressions;
using CheckInn.Repositories.Repos.Helpers;

namespace CheckInn.Repositories.Interfaces;

public interface IBaseRepository<T, TKey> where T : class
{
    Task<T> GetById(TKey id);
    Task<IEnumerable<T>> GetAllAsync();
    PagedResult<T> GetPaged(int page, int pageSize, Expression<Func<T, bool>> predicate = null,
        string[] includes = null);
    IEnumerable<T> Find(Expression<Func<T, bool>> predicate, string[] includes = null, bool NoTracking = false);
    IEnumerable<T> Query(string expression, params object[] prm);
    T Add(T entity);
    void Update(T entity);
    void UpdateRange(IEnumerable<T> entities);
    Task Remove(TKey id);
    void Remove(T entity);
    void RemoveRange(IEnumerable<T> entities);
    Task<bool> Exists(Expression<Func<T, bool>> predicate);
}