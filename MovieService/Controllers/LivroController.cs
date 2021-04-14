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
    public class LivroController : ControllerBase
    {
        [ActionName("GetById")]
        [HttpPost]
        public async Task<IActionResult> GetById([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0003_livro Livro = await db.tbl_0003_livro.Where(i => i.cd_livro == requestBody).FirstOrDefaultAsync();

                    return Ok(Livro);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
