using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using HtmlAgilityPack;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BarcodeController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;

        public BarcodeController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }
        [HttpGet("{barcode}")]
        public async Task<IActionResult> GetImageFromBarcode(string barcode)
        {
            // Construct the URL using the barcode
            string url = $"https://www.zara.com/qr/{barcode}";

            // Create HttpClient instance
            var client = _clientFactory.CreateClient();

            try
            {
                // Make an HTTP request to the URL
                var response = await client.GetAsync(url);

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    // Read the HTML content
                    string htmlContent = await response.Content.ReadAsStringAsync();

                    // Parse the HTML content using HtmlAgilityPack
                    var htmlDocument = new HtmlDocument();
                    htmlDocument.LoadHtml(htmlContent);

                    // Find the <img> tag in the HTML content
                    var imageUrlNode = htmlDocument.DocumentNode.SelectSingleNode("//img");

                    if (imageUrlNode != null)
                    {
                        // Get the value of the "src" attribute of the <img> tag
                        string imageUrl = imageUrlNode.GetAttributeValue("src", "");

                        // Return the image URL
                        return Ok(imageUrl);
                    }
                    else
                    {
                        // If <img> tag not found, return an error response
                        return NotFound("Image not found on the page.");
                    }
                }
                else
                {
                    // If request was not successful, return an error response
                    Console.WriteLine(response);
                    return StatusCode((int)response.StatusCode, "Failed to retrieve HTML content from the URL.");
                }
            }
            catch (Exception ex)
            {
                // If an exception occurs during the process, return an error response
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



    }
}
