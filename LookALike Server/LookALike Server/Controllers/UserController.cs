using LookALike_Server.Class;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [EnableCors("myPolicy")]
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

        // PUT api/<UserController>/login
        [HttpPut("login")]
        public IActionResult Login([FromBody] User userCredentials)
        {
            // Authenticate user
            var authenticatedUser = userCredentials.UserLogin();

            if (authenticatedUser != null)
            {
                // User authenticated successfully, return user data
                return Ok(authenticatedUser);
            }
            else
            {
                // Authentication failed, return unauthorized status
                return Unauthorized();
            }
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
