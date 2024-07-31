using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<Colors> Get()
        {
            Colors c = new Colors();
            return c.Read();
        }

        // GET api/<ColorsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ColorsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ColorsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ColorsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
