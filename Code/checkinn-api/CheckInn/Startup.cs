using System.Text;
using CheckInn.Util.AuthPolicy;
using CheckInn.Util.WebHostEnvironment;
using Entities;
using Entities.DTOs.Config;
using Entities.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;

namespace CheckInn;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Register AutoMapper
        services.AddAutoMapper(typeof(MappingConfig));

        // Register DbContext
        services.AddDbContext<ApiDbContext>(options =>
        {
            options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        });
        
        // IdentityCore
        var identity = services.AddIdentity<User, IdentityRole>(options => options.User.RequireUniqueEmail = true);
        identity = new IdentityBuilder(identity.UserType, typeof(IdentityRole), services);
        identity.AddEntityFrameworkStores<ApiDbContext>().AddDefaultTokenProviders();
        
        //Config JWT
        var key = Environment.GetEnvironmentVariable("KEY");
        
        services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                };
            });

        // Set up Authorization Policies
        services.AddAuthorization(options =>
        {
            options.AddPolicy(AuthPolicy.SuperAdminOnly, policy => policy.RequireRole(AuthRoles.SuperAdmin));
            options.AddPolicy(AuthPolicy.AdminsOnly, policy => policy.RequireRole(AuthRoles.SuperAdmin, AuthRoles.Admin));
            options.AddPolicy(AuthPolicy.ManagerAndAbove, policy => policy.RequireRole(AuthRoles.SuperAdmin, AuthRoles.Admin, AuthRoles.Manager));
            options.AddPolicy(AuthPolicy.ClientsAndAbove, policy => policy.RequireRole(AuthRoles.SuperAdmin, AuthRoles.Admin, AuthRoles.Manager, AuthRoles.Client));
            options.AddPolicy(AuthPolicy.GuestsAndAbove, policy => policy.RequireRole(AuthRoles.SuperAdmin, AuthRoles.Admin, AuthRoles.Manager, AuthRoles.Client, AuthRoles.Guest));
        });

        // Register Serilog
        services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.AddSerilog(new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.Console()
                .CreateLogger());
        });

        services.AddControllers();

        // Register Swagger
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = @"JWT Authorization header using the Bearer scheme.
                            Enter 'Bearer' [space] and then your token in the text input below.
                            Example: 'Bearer 1234Sabcdef'",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "0auth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                }
            });
        });

        // Add any other dependencies here
        // services.AddSingleton<ISomeService, SomeService>();
        services.AddSingleton<ICheckInnWebHostEnvironment, CheckInnWebHostEnvironment>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseCors(cpb => cpb.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
        
        // Configure the app here
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseRouting();
        
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(env.WebRootPath, "Files\\images")),
            RequestPath = "/images"
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
        
    }
}