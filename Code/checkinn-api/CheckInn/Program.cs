using Autofac;
using Autofac.Extensions.DependencyInjection;
using CheckInn;
using CheckInn.Repositories.DI;
using CheckInn.Services.DI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace CheckInn;
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseServiceProviderFactory(new AutofacServiceProviderFactory())
            .ConfigureContainer<ContainerBuilder>(builder =>
            {
                builder.RegisterModule(new RepositoryModule());
                builder.RegisterModule(new ServiceModule());
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
