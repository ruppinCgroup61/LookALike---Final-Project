using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
        public ActionResult<List<object>> GetFollowers(string followingEmail)
        {
            try
            {
                // Create an instance of UserFollowers class
                UserFollowers userFollowers = new UserFollowers("", followingEmail);

                // Call the method to search for followers' emails
                List<object> followerEmails = userFollowers.SearchUserFollowers(followingEmail);

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

        // DELETE api/<UserFollowerController>/deleteFriend
        [HttpDelete("deleteFriend")]
        public IActionResult DeleteFriend(string adminMail, string friendMail)
        {
            UserFollowers userf = new UserFollowers();
            int result = userf.DeleteFriend(adminMail, friendMail);

            if (result == 1)
            {
                return Ok("The user deleted successfully");
            }
            else
            {
                return StatusCode(500, "The user is not in the system");
            }
        }
    }
}
