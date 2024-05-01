using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClothingTypeController : ControllerBase
    {
        // GET: api/<ClothingTypeController>
        [HttpGet]
        public IEnumerable<ClothingType> Get()
        {
            ClothingType ct = new ClothingType();
            return ct.ReadClothingTypes();
        }

        // GET api/<ClothingTypeController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ClothingTypeController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ClothingTypeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ClothingTypeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
