using System.Linq.Expressions;
using CheckInn.Repositories.Interfaces;
using CheckInn.Repositories.Repos.Helpers;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace CheckInn.Repositories.Repos;

public class BaseRepository<T, TKey> : IBaseRepository<T, TKey> where T : class
{
    protected readonly ApiDbContext _db;
    protected readonly DbSet<T> _context;

    public BaseRepository(ApiDbContext db)
    {
        _db = db;
        _context = _db.Set<T>();
    }
    
    public async Task<T> GetById(TKey id)
    {
        return await _context.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _context.ToListAsync();
    }

    public PagedResult<T> GetPaged(int page, int pageSize, Expression<Func<T, bool>> predicate = null, string[] includes = null)
    {
        var result = new PagedResult<T>();
        IQueryable<T> tempQuery = _context.Where(predicate);
        
        if (includes != null)
        {
            tempQuery = includes.Aggregate(tempQuery, (current, item) => current.Include(item));
        }
        
        result.CurrentPage = page;
        result.PageSize = pageSize;
        result.RowCount = tempQuery.Count();


        var pageCount = (double)result.RowCount / pageSize;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;


        result.Results = tempQuery.Skip(skip).Take(pageSize).ToList();

        return result;
    }

    public IEnumerable<T> Find(Expression<Func<T, bool>> predicate, string[] includes = null, bool NoTracking = false)
    {
        var query = _context.Where(predicate);

        if (includes != null)
        {
            foreach (var item in includes)
            {
                query = query.Include(item);
            }
        }
        return (NoTracking) ? query.AsNoTracking() : query;
    }

    public IEnumerable<T> Query(string expression, params object[] prm)
    {
        return _context.FromSqlRaw<T>(expression, prm);
    }

    public T Add(T entity)
    {
        _context.Add(entity);
        _db.ChangeTracker.TrackGraph(entity, e =>
        {
            e.Entry.State = EntityState.Added;
        });
        return _context.Add(entity).Entity;
    }

    public void Update(T entity)
    {
        _context.Update(entity);
    }

    public void UpdateRange(IEnumerable<T> entities)
    {
        _context.UpdateRange(entities);
    }

    public async Task Remove(TKey id)
    {
        var entity = await _context.FindAsync(id);

        Remove(entity);
    }

    public void Remove(T entity)
    {
        if (entity != null)
        {
            _context.Remove(entity);
        }
    }

    public void RemoveRange(IEnumerable<T> entities)
    {
        _context.RemoveRange(entities);
    }

    public async Task<bool> Exists(Expression<Func<T, bool>> predicate)
    {
        return await _context.AnyAsync(predicate);
    }
}