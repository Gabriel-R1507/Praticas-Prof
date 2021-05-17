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
    public class AvaliacaoController : ControllerBase
    {
        [ActionName("GetByItemPage")]
        [HttpPost]
        public async Task<IActionResult> GetByLogin([FromBody] ItemPageDTO requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0003_avaliacao Aval = await db.tbl_0003_avaliacao.Where(i => i.usuario == requestBody.usuario && i.item == requestBody.item).FirstOrDefaultAsync();

                    return Ok(Aval);
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
                    tbl_0003_avaliacao Avaliacao = await db.tbl_0003_avaliacao.Where(i => i.cd_avaliacao == requestBody).FirstOrDefaultAsync();

                    return Ok(Avaliacao);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("InsertAvaliacao")]
        [HttpPost]
        public async Task<IActionResult> InsertAvaliacao([FromBody] tbl_0003_avaliacao requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    db.tbl_0003_avaliacao.Add(requestBody);
                    db.SaveChanges();
                    tbl_0003_avaliacao Avaliacao = await db.tbl_0003_avaliacao.Where(i => i.item == requestBody.item && i.usuario == requestBody.usuario).FirstOrDefaultAsync();
                    return Ok(Avaliacao.cd_avaliacao);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetByItem")]
        [HttpPost]
        public async Task<IActionResult> GetByItem([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<tbl_0003_avaliacao> Avaliacao = await db.tbl_0003_avaliacao.Where(i => i.item == requestBody).ToListAsync();

                    return Ok(Avaliacao);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetByUser")]
        [HttpPost]
        public async Task<IActionResult> GetByUser([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<tbl_0003_avaliacao> Avaliacao = await db.tbl_0003_avaliacao.Where(i => i.usuario == requestBody).ToListAsync();

                    return Ok(Avaliacao);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


    }
}
