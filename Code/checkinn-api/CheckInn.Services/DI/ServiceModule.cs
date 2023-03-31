using System.Reflection;
using Autofac;
using Module = Autofac.Module;

namespace CheckInn.Services.DI;

public class ServiceModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
        var dataAccess = Assembly.GetExecutingAssembly();

        builder.RegisterAssemblyTypes(dataAccess)
            .Where(t => t.Name.EndsWith("Service"))
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope();
    }
}