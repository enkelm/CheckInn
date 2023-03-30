namespace CheckInn.Repositories.Repos.Helpers;

public class PagedResult<T> : BasePagedResult
{
    public IList<T> Results { get; set; }

    public PagedResult()
    {
        Results = new List<T>();
    }
}