using LookALike_Server.Class;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LookALike_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PopupDetailsController : ControllerBase
    {
        // GET: api/<PopupDetailsController>
        [HttpGet]
        public IEnumerable<object> Get()
        {
            PopupDetails popupdetails = new PopupDetails();
            return popupdetails.Read();
        }

        // GET api/<PopupDetailsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PopupDetailsController>
        [HttpPost]
        public int Post([FromBody] PopupDetails popupdetails)
        {
            int NumberOfInsert = -1;
            bool insertCheck = popupdetails.Insert();
            if (insertCheck)
            {
                NumberOfInsert = 1;
            }
            return NumberOfInsert;
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
