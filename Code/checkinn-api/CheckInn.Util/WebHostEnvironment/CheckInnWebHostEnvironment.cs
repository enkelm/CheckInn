using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;

namespace CheckInn.Util.WebHostEnvironment;

public class CheckInnWebHostEnvironment : ICheckInnWebHostEnvironment
{
    private readonly IWebHostEnvironment _hostEnvironment;

    public CheckInnWebHostEnvironment(IWebHostEnvironment hostEnvironment)
    {
        _hostEnvironment = hostEnvironment;
        ContentRootPath = hostEnvironment.ContentRootPath;
        EnvironmentName = hostEnvironment.EnvironmentName;
        WebRootPath = hostEnvironment.WebRootPath;
        WebRootFileProvider = hostEnvironment.WebRootFileProvider;
    }

    public string ApplicationName
    {
        get => _hostEnvironment.ApplicationName;
        set => _hostEnvironment.ApplicationName = value;
    }

    public IFileProvider ContentRootFileProvider
    {
        get => _hostEnvironment.ContentRootFileProvider;
        set => _hostEnvironment.ContentRootFileProvider = value;
    }

    public string ContentRootPath
    {
        get => _hostEnvironment.ContentRootPath;
        set => _hostEnvironment.ContentRootPath = value;
    }

    public string EnvironmentName
    {
        get => _hostEnvironment.EnvironmentName;
        set => _hostEnvironment.EnvironmentName = value;
    }

    public string WebRootPath
    {
        get => _hostEnvironment.WebRootPath;
        set => _hostEnvironment.WebRootPath = value;
    }

    public IFileProvider WebRootFileProvider
    {
        get => _hostEnvironment.WebRootFileProvider;
        set => _hostEnvironment.WebRootFileProvider = value;
    }
}