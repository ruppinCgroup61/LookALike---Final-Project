using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

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
        [HttpGet("GetAllTop{email}")]
        public ActionResult<List<Item>> GetTopItemsByUser(string email)
        {
            // Create an instance of Item to access the method
            Item item = new Item();
            // Call the method and get the list of items
            List<Item> items = item.GetAllTopItems(email);

            //// Check if the list is null or empty and return appropriate response
            //if (items == null || items.Count == 0)
            //{
            //    return NotFound();
            //}

            return Ok(items);
        }
        // GET api/<ItemController>/5
        [HttpGet("GetAllBottom{email}")]
        public ActionResult<List<Item>> GetBottomItemsByUser(string email)
        {
            // Create an instance of Item to access the method
            Item item = new Item();
            // Call the method and get the list of items
            List<Item> items = item.GetAllBottomItems(email);

            //// Check if the list is null or empty and return appropriate response
            //if (items == null || items.Count == 0)
            //{
            //    return NotFound();
            //}

            return Ok(items);
        }

        // GET api/<ItemController>/5
        [HttpGet("GetAllItemsByUser{email}")]
        public ActionResult<List<object>> GetAllItemsByUser(string email)
        {
            // Create an instance of Item to access the method
            Item item = new Item();
            // Call the method and get the list of items
            List<object> items = item.GetAllItemsByUser(email);

            //// Check if the list is null or empty and return appropriate response
            //if (items == null || items.Count == 0)
            //{
            //    return NotFound();
            //}

            return Ok(items);
        }

        // GET api/<ItemController>/5
        [HttpGet("CountItems{email}")]
        public ActionResult<List<object>> CountItems(string email)
        {
            // Create an instance of Item to access the method
            Item item = new Item();
            // Call the method and get the list of items
            List<object> CountList = item.NumberOfItems(email);

            return Ok(CountList);
        }

        // POST api/<ItemController>
        [HttpPost]
        public int Post([FromBody] Item item)
        {
            int NumberOfInsert = -1;
            bool insertCheck = item.Insert();
            if (insertCheck)
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

        // PUT api/<ItemController>/UpdateItemStatusAndDeleteAd
        [HttpPut("UpdateItemStatusAndDeleteAd")]
        public IActionResult UpdateItemStatusAndDeleteAd([FromQuery] int itemId, [FromQuery] int statusCheck)
        {
            Item item = new Item();
            bool result = item.UpdateItemStatusAndDeleteAd(itemId, statusCheck);

            if (result)
            {
                return Ok(new { message = "Item status updated and ad deleted successfully." });
            }
            else
            {
                return BadRequest(new { message = "Failed to update item status and delete ad." });
            }
        }

        // PUT api/<ItemController>/UpdateItemStatusAndDeleteAd
        [HttpPut("DeleteItem")]
        public IActionResult DeleteItemFromDatabase([FromQuery] int itemId)
        {
            Item item = new Item();
            bool result = item.DeleteItem(itemId);

            if (result)
            {
                return Ok(new { message = "Item deleted successfully." });
            }
            else
            {
                return BadRequest(new { message = "Failed to delete Item." });
            }
        }

        // DELETE api/<ItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
