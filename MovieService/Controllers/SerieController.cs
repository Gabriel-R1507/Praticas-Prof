using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Controllers
{
    public class SerieController : ControllerBase
    {

        [ActionName("GetById")]
        [HttpPost]
        public async Task<IActionResult> GetById([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0004_serie Serie = await db.tbl_0004_serie.Where(i => i.cd_serie == requestBody).FirstOrDefaultAsync();

                    return Ok(Serie);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
