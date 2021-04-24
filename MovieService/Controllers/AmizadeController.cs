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
    public class AmizadeController : ControllerBase
    {
        [ActionName("CreateAmizade")]
        [HttpPost]
        public async Task<IActionResult> CreateAmizade([FromBody] AmizadeDto requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0005_amizade Amizade = new tbl_0005_amizade();
                    Amizade.data_amizade = new DateTime();
                    Amizade.solicitante_amizade = requestBody.user1;
                    Amizade.recebidor_amizade = requestBody.user2;
                    Amizade.status_amizade = false;
                    db.tbl_0005_amizade.Add(Amizade);
                    db.SaveChanges();
                    tbl_0005_amizade AmizadeRetorno = await db.tbl_0005_amizade.Where(i => i.solicitante_amizade == requestBody.user1 && i.recebidor_amizade == requestBody.user2).FirstOrDefaultAsync();
                    return Ok(AmizadeRetorno.cd_amizade);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetAmizade")]
        [HttpPost]
        public async Task<IActionResult> GetAmizade([FromBody] AmizadeDto requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0005_amizade Amizade = await db.tbl_0005_amizade.Where(i => (i.solicitante_amizade == requestBody.user1 && i.recebidor_amizade == requestBody.user2) || (i.solicitante_amizade == requestBody.user2 && i.recebidor_amizade == requestBody.user1)).FirstOrDefaultAsync();

                    return Ok(Amizade);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetAmizadeByRecebidor")]
        [HttpPost]
        public async Task<IActionResult> GetAmizadeByRecebidor([FromBody] AmizadeDto requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0005_amizade[] amigs;

                    List<tbl_0005_amizade> Amizade = await db.tbl_0005_amizade.Where(i => i.recebidor_amizade == requestBody.user2).ToListAsync();

                    return Ok(Amizade);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
