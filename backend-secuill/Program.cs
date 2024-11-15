
using backend_secuill;
using backend_secuill.Models;
using backend_secuill.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend_secuill.Interface;
using Microsoft.OpenApi.Models;
using System.Net.Mime;
using backend_secuill.ResponseModel.ErrorModel;
using System.Collections;
using backend_secuill.ResponseModel;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

IConfiguration config = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional:false,reloadOnChange: false ).Build();
// Add services to the container.
//var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
//var dbName = Environment.GetEnvironmentVariable("DB_NAME");
//var dbPassword = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");
builder.Services.AddDbContext<SecuillV5TuContext>(options =>
options.UseSqlServer(config.GetConnectionString("pathsql_secuill")));

//var dbHostMiddle = Environment.GetEnvironmentVariable("DB_HOST_MIDDLE");
//var dbNameMiddle = Environment.GetEnvironmentVariable("DB_NAME_MIDDLE");
//var dbPasswordMiddle = Environment.GetEnvironmentVariable("DB_SA_PASSWORD_MIDDLE");

builder.Services.AddDbContext<ConhisMiddleV4UbchContext>(options =>
options.UseSqlServer(config.GetConnectionString("pathsql_middle")));

builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {  
        var result = new ValidationFailedResult(context.ModelState);
        // TODO: add `using System.Net.Mime;` to resolve MediaTypeNames  
        result.ContentTypes.Add(MediaTypeNames.Application.Json);

        return result;
    };
});

builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
builder.Services.AddScoped<ISummaryPickRepository, SummaryPickRepository>();
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IMiddleRepository, MiddleRepository>();
builder.Services.AddScoped<IAuthenRepository, AuthenRepository>();
builder.Services.AddScoped<IDrugsRepository, DrugRepository>();
builder.Services.AddScoped<IMachineRepository, MachineRepository>();
builder.Services.AddScoped<IPrintLabel,PrintLabelRepository>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1.2", new OpenApiInfo { Title = "Api Secuill", Version = "v1.2" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
/////////////////// Jwt ///////////////////

var key = config["Jwt:Key"];
builder.Services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero,
    };
});

builder.Services.AddAuthorizationBuilder()
  .AddPolicy("login", policy => policy.RequireAuthenticatedUser());

builder.Services.AddSingleton<JwtAuthenticationManager>(new JwtAuthenticationManager(key));

////////////////////////////////////////


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowOrigins",
                      policy =>
                      {
                          policy.WithOrigins("*").AllowAnyHeader().WithMethods("PATCH","GET","POST","PUT","DELETE");
                      });
});

//builder.Services.AddAuthorization(options =>
//{
//    options.FallbackPolicy = new AuthorizationPolicyBuilder()
//        .RequireAuthenticatedUser()
//        .Build();
//});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1.2/swagger.json", "Api Secuill v1.2"));

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.Use(async (context, next) =>
{
    await next(context);
    if (context.Response.StatusCode == 403 && !context.Response.HasStarted)
    {
        context.Response.WriteAsJsonAsync(new SendResponseModel(403, "ไม่มีสิทธิ์เข้าถึง Function การทำงาน", null));
    }
    else if (context.Response.StatusCode == 401 && !context.Response.HasStarted)
    {
        context.Response.WriteAsJsonAsync(new SendResponseModel(401, "ยังไม่ได้ยืนยันตัวตน กรุณายืนยันตัวตนก่อนการใช้งาน", null));
    }
    else if (context.Response.StatusCode == 400 && !context.Response.HasStarted)
    {
        context.Response.WriteAsJsonAsync(new SendResponseModel(400, "Bad Request", null));
    }
});

app.UseCors("AllowOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

//app.UseStaticFiles();


//app.UseStaticFiles(new StaticFileOptions
//{
//    OnPrepareResponse = (context) =>
//    {
//        if (!context.Context.User.Identity.IsAuthenticated)
//        {
//            throw new Exception("Not authenticated");
//        }
//    },
//    FileProvider = new PhysicalFileProvider(
//           Path.Combine(builder.Environment.ContentRootPath, "img")),
//    RequestPath = "/img"
//});


//app.MapGet("/download/img/{fileName}", IResult (string fileName) =>
//{
//    var filePath = Path.Combine(builder.Environment.ContentRootPath, "img", fileName);

//    if (File.Exists(filePath))
//    {
//        return TypedResults.PhysicalFile(filePath, fileDownloadName: $"{fileName}");
//    }
//    return TypedResults.NotFound("No file found with the supplied file name ");
//})
//.WithName("GetFileByName")
//.RequireAuthorization("login");


app.MapControllers();

app.Run();
