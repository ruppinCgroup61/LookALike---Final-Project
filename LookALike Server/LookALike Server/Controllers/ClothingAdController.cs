using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClothingAdController : ControllerBase
    {
        // GET: api/<ClothingAdController>
        [HttpGet]
        public IEnumerable<ClothingAd> Get()
        {
            ClothingAd clothingAd = new ClothingAd();
            return clothingAd.Read();
        }

        // GET api/<ClothingAdController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ClothingAdController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ClothingAdController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ClothingAdController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
