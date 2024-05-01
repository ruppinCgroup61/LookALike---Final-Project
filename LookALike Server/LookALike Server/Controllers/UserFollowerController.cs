using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFollowerController : ControllerBase
    {
        // GET: api/<UserFollowerController>
        [HttpGet]
        public IEnumerable<UserFollowers> Get()
        {
            UserFollowers userf = new UserFollowers();
            return userf.ReadAllFollowers();
        }

        [HttpGet("followers/{followingEmail}")]
        public ActionResult<List<string>> GetFollowers(string followingEmail)
        {
            try
            {
                // Create an instance of UserFollowers class
                UserFollowers userFollowers = new UserFollowers("", followingEmail);

                // Call the method to search for followers' emails
                List<string> followerEmails = userFollowers.SearchUserFollowers();

                if (followerEmails.Count > 0)
                {
                    // Found followers, return them
                    return followerEmails;
                }
                else
                {
                    // No followers found
                    return NotFound("No followers found for the specified following email.");
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST api/<UserController>
        [HttpPost]
        public int Post([FromBody] UserFollowers userF)
        {
            int NumberOfInsert = userF.InsertNewFollower();
            return NumberOfInsert;
        }

        // GET api/<UserFollowerController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // PUT api/<UserFollowerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserFollowerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
