using CheckInn.Util.WebHostEnvironment;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CheckInn.Services.Util.FileService;

public class FileService : IFileService
{
    private readonly ICheckInnWebHostEnvironment _environment;

    public FileService(ICheckInnWebHostEnvironment environment)
    {
        _environment = environment;
    }


    public string GetImagesFolderPath()
    {
        return Path.Combine(_environment.WebRootPath, "Files\\images");
    }

    public async Task<string> SaveFile(IFormFile file)
    {
        var special = Guid.NewGuid().ToString();
        var folderPath = _environment.WebRootPath + "\\Uploads\\ProductImages";
        var fileName = special + "-" + file.FileName;

        var filePath = Path.Combine(Directory.GetCurrentDirectory(), folderPath, fileName);
        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        return Path.Combine("https://localhost:44384/images", fileName);
    }
    
    public async Task<bool> UpdateFile(IFormFile? file, string? path)
    {
        if (file == null || path == null) return false;

        await using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);

        return true;
    }
}