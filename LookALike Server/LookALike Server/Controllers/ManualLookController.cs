﻿using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManualLookController : ControllerBase
    {
        // GET: api/<ManualLookController>
        [HttpGet]
        public IEnumerable<ManualLook> Get()
        {
            ManualLook manualLook = new ManualLook();
            return manualLook.Read();
        }

        // GET api/<ManualLookController>/5
        [HttpGet("GetAllManualLooksbyEmail/{email}")]
        public IActionResult GetAllManualLooksbyEmail(string email)
        {
            // Create an instance of PopUp to access the method
            ManualLook manualLook = new ManualLook();
            List<ManualLook> manualLookList = manualLook.ReadByEmail(email);

            // Check if there are popups
            if (manualLookList == null || manualLookList.Count == 0)
            {
                return NotFound("There are no looks for this user");
            }

            return Ok(manualLookList);
        }

        // GET api/<ManualLookController>/5
        [HttpGet("GetLooksDetails/{email}")]
        public IActionResult GetLooksDetails(string email)
        {
            // Create an instance of PopUp to access the method
            ManualLook manualLook = new ManualLook();
            List<object> manualLookList = manualLook.ReadLookFullDetails(email);

            // Check if there are popups
            if (manualLookList == null || manualLookList.Count == 0)
            {
                return NotFound("There are no looks for this user");
            }

            return Ok(manualLookList);
        }

        // POST api/<ItemController>
        [HttpPost]
        public int Post([FromBody] ManualLook manualLook)
        {
            int NumberOfInsert = -1;
            bool insertCheck = manualLook.Insert();
            if (insertCheck)
            {
                NumberOfInsert = 1;
            }
            return NumberOfInsert;
        }

        // PUT api/<ManualLookController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ManualLookController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
