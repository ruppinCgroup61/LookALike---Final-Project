using LookALike_Server.Class;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

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

        // GET api/<ItemController>/GetUserFullName/{email}
        [HttpGet("GetUserFullName/{email}")]
        public ActionResult<string> GetUserFullName(string email)
        {
            // Create an instance of User to access the method
            User user = new User();
            string fullName = user.GetFullName(email);

            // Check if the full name is null and return appropriate response
            if (fullName == null)
            {
                return NotFound("Full name not found for the provided email.");
            }

            return Ok(fullName);
        }

        // PUT api/<UserController>/5
        [HttpPut("{Email}")]
        public int Put([FromBody] User u)
        {
            return u.UpdateUser();
        }

        // PUT api/<UserController>/AddOrUpdateEntry
        [HttpPut("AddOrUpdateEntry")]
        public IActionResult AddOrUpdateEntry([FromQuery] string adminUserMail, [FromQuery] string closetMail)
        {
            if (string.IsNullOrEmpty(adminUserMail) || string.IsNullOrEmpty(closetMail))
            {
                return BadRequest("Invalid data.");
            }

            DBservices dbs = new DBservices();

            try
            {
                int result = dbs.AddOrUpdateEntry(adminUserMail, closetMail);
                if (result ==-1)
                {
                    return Ok("Entry added or updated successfully.");
                }
                else
                {
                    return StatusCode(500, "An error occurred while adding or updating the entry.");
                }
            }
            catch (Exception ex)
            {
                // write to log
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
