﻿using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlgorithmController : ControllerBase
    {
        // GET: api/<AlgorithmController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AlgorithmController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AlgorithmController>
        [HttpPost("LikeItemFromFriendCloset")]
        public IActionResult Post([FromBody] LikesTable likeTable)
        {
            if (likeTable == null)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                int result = likeTable.InsertlikeToLikesTable(likeTable.AdminUserMail, likeTable.ClosetUserMail, likeTable.ItemId);
                if (result > 0)
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

        // GET api/<AlgorithmController>/GetAllLikedItems
        [HttpGet("GetAllLikedItemsByFriend")]
        public IActionResult GetAllItemsByUserClosetWithLikes([FromQuery] string AdminUserMail, [FromQuery] string ClosetOwnerMail)
        {
            LikesTable LikeRow = new LikesTable();
            List<object> allItemsList = LikeRow.GetAllItemsByUserClosetWithLikes(AdminUserMail, ClosetOwnerMail);

            if (allItemsList == null || allItemsList.Count == 0)
            {
                return NotFound("There are no items for this user");
            }

            return Ok(allItemsList);
        }

        // GET api/<AlgorithmController>/GetAllLikedItems
        [HttpGet("GetAllLikedItems")]
        public IActionResult GetLikedItemsForHomePageApi([FromQuery] string AdminUserMail)
        {
            LikesTable LikeRow = new LikesTable();
            List<object> allItemsList = LikeRow.GetLikedItemsForHomePage(AdminUserMail);

            if (allItemsList == null || allItemsList.Count == 0)
            {
                return NotFound("There are no items for this user");
            }

            return Ok(allItemsList);
        }

        // PUT api/<AlgorithmController>/AddOrUpdateEntry
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
                if (result > 0)
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

        // DELETE api/<AlgorithmController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}