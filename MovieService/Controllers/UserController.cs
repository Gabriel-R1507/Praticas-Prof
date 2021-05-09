using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Domain;
using MovieService.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Controllers
{

    [Route("[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [ActionName("GetByLogin")]
        [HttpPost]
        public async Task<IActionResult> GetByLogin([FromBody] LoginDTO requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0001_user Cliente = await db.tbl_0001_user.Where(i => i.email_user == requestBody.email_user && i.senha_user == requestBody.senha_user).FirstOrDefaultAsync();

                    return Ok(Cliente.cd_user);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetById")]
        [HttpPost]
        public async Task<IActionResult> GetById([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0001_user Cliente = await db.tbl_0001_user.Where(i => i.cd_user == requestBody).FirstOrDefaultAsync();

                    return Ok(Cliente); 
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("InsertClie")]
        [HttpPost]
        public async Task<IActionResult> InsertClie([FromBody] tbl_0001_user requestBody)
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
    }
}
