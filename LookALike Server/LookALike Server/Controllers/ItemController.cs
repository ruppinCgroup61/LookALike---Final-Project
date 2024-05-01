﻿using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        // GET: api/<ItemController>
        [HttpGet]
        public IEnumerable<Item> Get()
        {
            Item item = new Item();
            return item.Read();
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ItemController>
        [HttpPost]
        public int Post([FromBody] Item item)
        {
            int NumberOfInsert = -1;
            bool insertCheck = item.Insert();
            if(insertCheck)
            {
                NumberOfInsert = 1;
            }
            return NumberOfInsert;
        }

        // PUT api/<ItemController>/5
        [HttpPut("{id}")]
        public int Put(int id, [FromBody] Item i)
        {
            return i.UpdateItem();
        }

        // DELETE api/<ItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}