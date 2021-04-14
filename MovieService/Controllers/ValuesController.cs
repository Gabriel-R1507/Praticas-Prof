using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieService.Data;
using Microsoft.EntityFrameworkCore;
using MovieService.Domain;
using Newtonsoft.Json.Linq;
using MovieService.Domain.DTO;
using Microsoft.AspNetCore.Authorization;

namespace MovieService.Controllers
{
    
    [AllowAnonymous]
    [Route("[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        [ActionName("SelectLogin")]
        [HttpPost]
        public async Task<IActionResult> SelectLogin([FromBody] LoginDTO requestBody)
        {
            try {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0001_user Cliente = await db.tbl_0001_user.Where(i => i.email_user == requestBody.email_user && i.senha_user == requestBody.senha_user).FirstOrDefaultAsync();
                    
                    return Ok(Cliente.cd_user);
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("InsetCad")]
        [HttpPost]
        public async Task<IActionResult> InsertCad([FromBody] tbl_0001_user requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    db.tbl_0001_user.Add(requestBody);
                    db.SaveChanges();
                    tbl_0001_user Cliente = await db.tbl_0001_user.Where(i => i.email_user == requestBody.email_user).FirstOrDefaultAsync();
                    return Ok(Cliente.cd_user);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
