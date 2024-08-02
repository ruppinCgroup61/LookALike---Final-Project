using Newtonsoft.Json;

public class OpenWeatherMapService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public OpenWeatherMapService(string apiKey)
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
    }

    public async Task<WeatherData> GetWeatherDataAsync(double latitude, double longitude)
    {
        string url = $"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={_apiKey}&units=metric";
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();

        var data = JsonConvert.DeserializeObject<dynamic>(content);

        return new WeatherData
        {
            Date = DateTime.Now.Date,
            Temperature = (float)data.main.temp,
            IsRainy = data.weather[0].main == "Rain",
            Season = GetSeason(DateTime.Now)
        };
    }

    private string GetSeason(DateTime date)
    {
        int month = date.Month;

        if (month >= 12 && month <= 5)
            return "Winter";
        else if (month >= 6 && month <= 8)
            return "Summer";
        else
            return "Other";
    }
}