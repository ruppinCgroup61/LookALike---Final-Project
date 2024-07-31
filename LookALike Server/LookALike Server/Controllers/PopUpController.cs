using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PopUpController : ControllerBase
    {
        // GET: api/<PopUpController>
        [HttpGet]
        public IEnumerable<PopUp> GetAllPopUps()
        {
            PopUp popupList = new PopUp();
            return popupList.ReadAllPopUps();
        }

        // GET api/<PopUpController>/GetAllPopUpsByEmail/{email}
        [HttpGet("GetAllPopUpsByEmail/{email}")]
        public IActionResult GetAllPopUpsByEmail(string email)
        {
            // Create an instance of PopUp to access the method
            PopUp popupInstance = new PopUp();
            List<PopUp> popupList = popupInstance.ReadByEmail(email);

            // Check if there are popups
            if (popupList == null || popupList.Count == 0)
            {
                return NotFound("There are no PopUps for this user");
            }

            return Ok(popupList);
        }


        // POST api/<PopUpController>
        [HttpPost]
        public int Post([FromBody] PopUp popup)
        {
            int NumberOfInsert = popup.CreateNewPopUp();
            return NumberOfInsert;
        }

        // PUT api/<PopUpController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PopUpController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
