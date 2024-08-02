using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using LookALike_Server.Class;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<WebSocketManager>();

// Add OpenWeatherMapService
builder.Services.AddSingleton<OpenWeatherMapService>(sp =>
    new OpenWeatherMapService(builder.Configuration["OpenWeatherMap:ApiKey"]));

// Add DBservices
builder.Services.AddTransient<DBservices>();

builder.Services.AddCors(p => p.AddPolicy("myPolicy", build =>
    build.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod())
);

// Register HttpClient
builder.Services.AddHttpClient();

// Add email configuration
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (true)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseAuthorization();
app.MapControllers();
app.UseWebSockets();

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/ws")
    {
        var webSocketServer = context.RequestServices.GetRequiredService<WebSocketManager>();
        await webSocketServer.HandleWebSocket(context);
    }
    else
    {
        await next();
    }
});

app.Run();