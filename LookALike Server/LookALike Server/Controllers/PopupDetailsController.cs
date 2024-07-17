using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PopupDetailsController : ControllerBase
    {
        // GET api/<PopUpController>/GetAllPopUpItems/{email}/{popUpId}
        [HttpGet("GetAllPopUpItems/{email}/{popUpId}")]
        public IActionResult GetAllPopUpsByEmail(string email, int popUpId)
        {
            // Create an instance of PopUp to access the method
            PopupDetails popupInstance = new PopupDetails();
            List<object> popupList = popupInstance.ReadAllPopUpItems(email, popUpId);

            // Check if there are popups
            if (popupList == null || popupList.Count == 0)
            {
                return NotFound("There are no items in this pop up");
            }

            return Ok(popupList);
        }

        // GET api/<PopupDetailsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        [Route("InsertItemToPopUp")]
        public IActionResult InsertItemToPopUp([FromBody] Item item, [FromQuery] int popUpId, [FromQuery] string userMail)
        {
            if (item == null)
            {
                return BadRequest("Item is null");
            }

            PopupDetails popupDetails = new PopupDetails();

            bool success = popupDetails.InsertItemToPopUp(item, popUpId, userMail);

            if (success)
            {
                return Ok("Item successfully inserted into the popup.");
            }
            else
            {
                return StatusCode(500, "Failed to insert item into the popup.");
            }
        }

        // PUT api/<PopupDetailsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PopupDetailsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
