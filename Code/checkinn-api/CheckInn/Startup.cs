using System.Text;
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
        // services.AddIdentity<IdentityUser, IdentityRole>()
        //     .AddEntityFrameworkStores<ApiDbContext>()
        //     .AddDefaultTokenProviders();
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
            options.AddPolicy("SuperAdminOnly", policy => policy.RequireRole("SuperAdmin"));
            options.AddPolicy("AdminsOnly", policy => policy.RequireRole("SuperAdmin, Admin"));
            options.AddPolicy("ManagerAndAbove", policy => policy.RequireRole("SuperAdmin, Admin, Manager"));
            options.AddPolicy("ClientsAndAbove", policy => policy.RequireRole("SuperAdmin, Admin, Manager, Client"));
            options.AddPolicy("GuestsAndAbove", policy => policy.RequireRole("SuperAdmin, Admin, Manager, Client, Guest"));
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