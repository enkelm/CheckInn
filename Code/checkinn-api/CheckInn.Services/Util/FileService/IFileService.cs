using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckInn.Services.Util.FileService;

public interface IFileService
{
    public string GetImagesFolderPath();
    public Task<string> SaveFile(IFormFile file);
    public Task<bool> UpdateFile(IFormFile? file, string? path);
}