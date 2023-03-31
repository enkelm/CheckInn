using System.Reflection;
using Autofac;
using CheckInn.Repositories.UoW;
using Module = Autofac.Module;

namespace CheckInn.Repositories.DI;

public class RepositoryModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
        var dataAccess = Assembly.GetExecutingAssembly();

        builder.RegisterAssemblyTypes(dataAccess)
            .Where(t => t.Name.EndsWith("Repository"))
            .AsImplementedInterfaces();
        builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
    }
}