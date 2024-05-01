using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            User user = new User();
            return user.Read();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public int Post([FromBody] User user)
        {
            int NumberOfInsert = user.Insert();
            return NumberOfInsert;
        }

        // POST api/<UsersController>
        [HttpPost]
        [Route("login")]
        public User Login([FromBody] User u)
        {
            return u.UserLogin();
        }

        // PUT api/<UserController>/5
        [HttpPut("{Email}")]
        public int Put([FromBody] User u)
        {
            return u.UpdateUser();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
