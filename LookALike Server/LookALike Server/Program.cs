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

// Configure CORS
builder.Services.AddCors(p => p.AddPolicy("myPolicy", build =>
    build.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod())
);

// Twilio configuration
builder.Services.Configure<TwilioOptions>(builder.Configuration.GetSection("Twilio"));
builder.Services.AddSingleton<TwilioService>();

// Register HttpClient
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("myPolicy");
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
