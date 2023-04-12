using System.Linq.Expressions;
using CheckInn.Repositories.Repos.Helpers;

namespace CheckInn.Repositories.Interfaces;

public interface IBaseRepository<T, TKey> where T : class
{
    /**
     * <summary>
     * Gets a generic <see cref="T"/> entity by its Id
     * </summary>
     * <param name="id">The id of the entity</param>
     * <returns>A <see cref="Task"/> which represents the asynchronous operation,
     * containing a generic value which represent the found entity</returns>
     */
    Task<T> GetById(TKey id);

    /**
     * <summary>
     * Retrieves a single entity from the database that matches the specified filter
     * criteria and includes related entities in the result if specified.
     * </summary>
     * <param name="predicate">The predicate which determines the search parameter</param>
     * <param name="includes">An array of strings representing the names of the related entities to include in the query result.</param>
     * <returns>
     * A <see cref="Task"/> which represents the asynchronous operation,
     * containing a generic value which represent the found entity
     * </returns>
     */
    Task<T> GetById(Expression<Func<T, bool>> predicate, string[] includes);
    /**
     * <summary>
     * Retrieves a single entity from the database that matches the specified filter
     * criteria and includes related entities in the result if specified.
     * </summary>
     * <param name="predicate">An expression that represents the filter criteria for the entity.</param>
     * <param name="includes">An enumerable of dictionaries representing the names of the related entities to include in the query result.</param>
     * <returns>
     * A <see cref="Task"/> which represents the asynchronous operation,
     * containing a generic value which represent the found entity
     * </returns>
     */
    Task<T> GetById(Expression<Func<T, bool>> predicate, IEnumerable<IDictionary<string, string?[]>> includes);
    /**
     * <summary>
     * Retrieves all entities of type <typeparamref name="T"/> from the database asynchronously.
     * </summary>
     * <returns>A task representing the asynchronous operation of retrieving all entities
     * of type <typeparamref name="T"/> from the database.</returns>
     */
    Task<IEnumerable<T>> GetAllAsync();
    /**
     * <summary>
     * Retrieves all entities of type <typeparamref name="T"/> from the database asynchronously, and includes related entities in the result if specified.
     * </summary>
     * <param name="includes">An array of strings representing the names of the related entities to include in the query result.</param>
     * <returns>A task representing the asynchronous operation of retrieving all entities of type <typeparamref name="T"/> from the database.</returns>
     */
    Task<IEnumerable<T>> GetAllAsync(string[] includes);
    /**
     * <summary>
     * Retrieves all entities of type <typeparamref name="T"/> from the database
     * asynchronously, and includes related entities in the result if specified.
     * </summary>
     * <param name="includes">An enumerable of dictionaries representing the names of the related entities and their child entities to include in the query result.</param>
     * <returns>A task representing the asynchronous operation of retrieving all entities of type <typeparamref name="T"/> from the database.</returns>
     */
    Task<IEnumerable<T>> GetAllAsync(IEnumerable<IDictionary<string, string?[]>> includes);
    /**
     * <summary>
     * Retrieves a page of entities of type <typeparamref name="T"/> from the database,
     * and optionally filters and includes related entities in the result.
     * </summary>
     * <param name="page">The page number to retrieve. Must be greater than zero.</param>
     * <param name="pageSize">The number of entities per page. Must be greater than zero.</param>
     * <param name="predicate">Optional. A filter expression to apply to the query.</param>
     * <param name="includes">Optional. An array of strings representing the names of the related entities to include in the query result.</param>
     * <returns>A <see cref="PagedResult{T}"/> object containing the page of entities
     * and additional metadata.</returns>
     */
    PagedResult<T> GetPaged(int page, int pageSize, Expression<Func<T, bool>>? predicate = null,
        string[] includes = null);
    /**
     * <summary>
     * Retrieves a collection of entities of type <typeparamref name="T"/> from the database based on the specified filter, and optionally includes related entities in the result.
     * </summary>
     * <param name="predicate">A filter expression to apply to the query.</param>
     * <param name="includes">Optional. An array of strings representing the names of the related entities to include in the query result.</param>
     * <param name="NoTracking">Optional. A flag that specifies whether to retrieve the entities with or without tracking changes.</param>
     * <returns>An <see cref="IEnumerable{T}"/> of entities that satisfy the filter expression.</returns>
     */
    IEnumerable<T> Find(Expression<Func<T, bool>> predicate, string[]? includes = null, bool NoTracking = false);
    /**
     * <summary>
     * Executes a query against the database and returns an <see cref="IEnumerable{T}"/> of entities of type <typeparamref name="T"/>.
     * </summary>
     * <param name="expression">The query to execute, specified as a string.</param>
     * <param name="prm">Optional. An array of objects representing the parameters required by the query.</param>
     * <returns>An <see cref="IEnumerable{T}"/> of entities that satisfy the query.</returns>
     */
    IEnumerable<T> Query(string expression, params object[] prm);
    /**
     * <summary>
     * Adds an entity of type <typeparamref name="T"/> to the database
     * and returns the added entity with any generated values.
     * </summary>
     * <param name="entity">The entity to add to the database.</param>
     * <returns>The added entity with any generated values, such as primary
     * key values.</returns>
     */
    T Add(T entity);
    /**
     * <summary>
     * Updates an existing entity of type <typeparamref name="T"/> in the database
     * with the values of the provided entity.
     * </summary>
     * <param name="entity">The entity to update in the database.</param>
     */
    void Update(T entity);
    /**
     * <summary>
     * Updates a range of existing entities of type <typeparamref name="T"/> in the
     * database with the values of the provided entities.
     * </summary>
     * <param name="entities">The entities to update in the database.</param>
     */
    void UpdateRange(IEnumerable<T> entities);
    /**
     * <summary>
     * Removes an entity of type <typeparamref name="T"/> from the database based on its primary key value.
     * </summary>
     * <param name="id">The primary key value of the entity to remove.</param>
     * <returns>A task representing the asynchronous operation.</returns>
     */
    Task Remove(TKey id);
    /**
     * <summary>
     * Removes an entity of type <typeparamref name="T"/> from the database.
     * </summary>
     * <param name="entity">The entity to remove from the database.</param>
     */
    void Remove(T entity);
    /**
     * <summary>
     * Removes a range of existing entities of type <typeparamref name="T"/> from the database.
     * </summary>
     * <param name="entities">The entities to remove from the database.</param>
     */
    void RemoveRange(IEnumerable<T> entities);
    /**
     * <summary>
     * Determines whether an entity of type <typeparamref name="T"/> exists in the database that matches the specified <paramref name="predicate"/>.
     * </summary>
     * <param name="predicate">The condition to check.</param>
     * <returns>
     * A task representing the asynchronous operation. The task result is true if an
     * entity exists that matches the specified <paramref name="predicate"/>;otherwise, false.
     * </returns>
     */
    Task<bool> Exists(Expression<Func<T, bool>> predicate);
}