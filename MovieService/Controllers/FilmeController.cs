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
    [AllowAnonymous]
    [Route("[controller]/[action]")]
    [ApiController]
    public class FilmeController : ControllerBase
    {

        [ActionName("GetById")]
        [HttpPost]
        public async Task<IActionResult> GetById([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0002_filme Filme = await db.tbl_0002_filme.Where(i => i.cd_filme == requestBody).FirstOrDefaultAsync();

                    return Ok(Filme);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("InsertFilme")]
        [HttpPost]
        public async Task<IActionResult> InsertFilme([FromBody] InsertFilmeDTO requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0002_filme Filme = new tbl_0002_filme();
                    Filme.titulo_filme = requestBody.titulo;
                    Filme.diretor_filme = requestBody.diretor;
                    Filme.elenco_filme = requestBody.elenco;
                    Filme.pais_filme = requestBody.pais;
                    Filme.ano_filme = requestBody.ano;

                    db.tbl_0002_filme.Add(Filme);
                    db.SaveChanges();

                    tbl_0002_filme Resp = await db.tbl_0002_filme.Where(i => i.titulo_filme == requestBody.titulo).FirstOrDefaultAsync();
                    return Ok(Resp.cd_filme);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
