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

        [ActionName("InsertFilme")]
        [HttpPost]
        public async Task<IActionResult> InsertFilme([FromBody] InsertSerieDTO requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0004_serie Serie = new tbl_0004_serie();
                    Serie.titulo_serie = requestBody.titulo;
                    Serie.diretor_serie = requestBody.diretor;
                    Serie.elenco_serie = requestBody.elenco;
                    Serie.pais_serie = requestBody.pais;
                    Serie.ano_serie = requestBody.ano;
                    Serie.temporadas_serie = requestBody.temporadas;

                    db.tbl_0004_serie.Add(Serie);
                    db.SaveChanges();

                    tbl_0004_serie Resp = await db.tbl_0004_serie.Where(i => i.titulo_serie == requestBody.titulo).FirstOrDefaultAsync();
                    return Ok(Resp.cd_serie);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
