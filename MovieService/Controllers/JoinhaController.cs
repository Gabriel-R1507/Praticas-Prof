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
    public class JoinhaController : ControllerBase
    {
        [ActionName("CreateJoinha")]
        [HttpPost]
        public async Task<IActionResult> CreateAmizade([FromBody] JoinhaDTO requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0004_joinha Joinha = new tbl_0004_joinha();
                    Joinha.usuario = requestBody.usuario;
                    Joinha.avaliacao = requestBody.avaliacao;

                    db.tbl_0004_joinha.Add(Joinha);
                    db.SaveChanges();

                    tbl_0004_joinha JoinhaRetorno = await db.tbl_0004_joinha.Where(i => i.avaliacao == requestBody.avaliacao && i.usuario == requestBody.usuario).FirstOrDefaultAsync();
                    return Ok(JoinhaRetorno);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("DeleteJoinha")]
        [HttpPost]
        public async Task<IActionResult> DeleteJoinha([FromBody] tbl_0004_joinha requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    db.Entry(requestBody).State = EntityState.Deleted;
                    db.SaveChanges();
                    return Ok(0);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetPerItem")]
        [HttpPost]
        public async Task<IActionResult> GetPerItem([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    int total = 0;
                    List<tbl_0003_avaliacao> Avaliacoes = await db.tbl_0003_avaliacao.Where(i => i.item == requestBody).ToListAsync();
                    foreach(tbl_0003_avaliacao aval in Avaliacoes)
                    {
                        List<tbl_0004_joinha> JoinhaRetorno = await db.tbl_0004_joinha.Where(i => i.avaliacao == aval.cd_avaliacao).ToListAsync();
                        total += JoinhaRetorno.Count;
                    }
                    
                    return Ok(total);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        
    }
}
