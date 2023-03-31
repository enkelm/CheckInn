using CheckInn.Repositories.UoW;
using Microsoft.Extensions.Logging;

namespace CheckInn.Services.Base;

public class BaseService : IBaseService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger _logger;

    public BaseService(IUnitOfWork unitOfWork, ILogger logger)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
    }
}