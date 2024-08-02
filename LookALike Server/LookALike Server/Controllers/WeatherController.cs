using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{
    private readonly OpenWeatherMapService _weatherService;
    private readonly DBservices _dbService;

    public WeatherController(OpenWeatherMapService weatherService, DBservices dbService)
    {
        _weatherService = weatherService;
        _dbService = dbService;
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateWeatherData()
    {
        // Tel Aviv coordinates
        double telAvivLatitude = 32.0853;
        double telAvivLongitude = 34.7818;

        var weatherData = await _weatherService.GetWeatherDataAsync(telAvivLatitude, telAvivLongitude);
        int numEffected = _dbService.UpdateWeatherData(weatherData);

        if (numEffected == 0)
        {
            return BadRequest("Failed to update weather data for Tel Aviv");
        }

        return Ok("Weather data updated successfully for Tel Aviv");
    }
}
