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
                    Amizade.data_amizade = DateTime.Now;
                    Amizade.solicitante_amizade = requestBody.user1;
                    Amizade.recebidor_amizade = requestBody.user2;
                    Amizade.status_amizade = 0;
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
                    tbl_0005_amizade Amizade = await db.tbl_0005_amizade.Where(i => ( (i.solicitante_amizade == requestBody.user1 && i.recebidor_amizade == requestBody.user2) || (i.solicitante_amizade == requestBody.user2 && i.recebidor_amizade == requestBody.user1) ) && i.status_amizade == 1 ).FirstOrDefaultAsync();
                    if (Amizade != null)
                    {
                        return Ok(Amizade);
                    }
                    return Ok(new object());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetAmizadeByRecebidor")]
        [HttpPost]
        public async Task<IActionResult> GetAmizadeByRecebidor([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<ResponseAmizadeDto> response = new List<ResponseAmizadeDto>();
                    List<tbl_0005_amizade> Amizades = await db.tbl_0005_amizade.Where(i => i.recebidor_amizade == requestBody && i.status_amizade == 0).ToListAsync();
                    foreach (tbl_0005_amizade a in Amizades)
                    {
                        tbl_0001_user usuario = await db.tbl_0001_user.Where(i => i.cd_user == a.solicitante_amizade).FirstOrDefaultAsync();
                        ResponseAmizadeDto unit = new ResponseAmizadeDto();
                        unit.cd_amizade = a.cd_amizade;
                        unit.nm_usuario = usuario.nm_user;
                        response.Add(unit);
                    }
                    
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetAmizadeUserPage")]
        [HttpPost]
        public async Task<IActionResult> GetAmizadeUserPage([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<ResponseUserPageDTO> response = new List<ResponseUserPageDTO>();

                    List<tbl_0005_amizade> AmizadeR  = await db.tbl_0005_amizade.Where(i => i.recebidor_amizade == requestBody && i.status_amizade == 1).ToListAsync();
                    List<tbl_0005_amizade> AmizadeS  = await db.tbl_0005_amizade.Where(i => i.solicitante_amizade == requestBody && i.status_amizade == 1).ToListAsync();

                    foreach (tbl_0005_amizade a in AmizadeR)
                    {
                        ResponseUserPageDTO runit = new ResponseUserPageDTO();
                        runit.cd_amigo = a.solicitante_amizade;
                        runit.nm_amigo = await db.tbl_0001_user.Where(i => i.cd_user == runit.cd_amigo).Select(i=> i.nm_user).FirstOrDefaultAsync();
                        response.Add(runit);
                    }
                    
                    foreach (tbl_0005_amizade a in AmizadeS)
                    {
                        ResponseUserPageDTO runit = new ResponseUserPageDTO();
                        runit.cd_amigo = a.recebidor_amizade;
                        runit.nm_amigo = await db.tbl_0001_user.Where(i => i.cd_user == runit.cd_amigo).Select(i => i.nm_user).FirstOrDefaultAsync();
                        response.Add(runit);
                    }
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("AceitarAmizade")]
        [HttpPost]
        public async Task<IActionResult> AceitarAmizade([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {

                    tbl_0005_amizade Amizade = await db.tbl_0005_amizade.Where(r => r.cd_amizade == requestBody).FirstOrDefaultAsync();

                    Amizade.status_amizade = 1;

                    db.Entry(Amizade).State = EntityState.Modified;
                    db.SaveChanges();

                    return Ok(Amizade.cd_amizade);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("NegarAmizade")]
        [HttpPost]
        public async Task<IActionResult> NegarAmizade([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {

                    tbl_0005_amizade Amizade = await db.tbl_0005_amizade.Where(r => r.cd_amizade == requestBody).FirstOrDefaultAsync();

                    Amizade.status_amizade = 2;

                    db.Entry(Amizade).State = EntityState.Modified;
                    db.SaveChanges();

                    return Ok(Amizade.cd_amizade);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetMedAmigos")]
        [HttpPost]
        public async Task<IActionResult> GetMedAmigos()
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<tbl_0001_user> Usuarios = await db.tbl_0001_user.Where(i => i.tipo == 1).ToListAsync();

                    List<tbl_0005_amizade> Amizades = await db.tbl_0005_amizade.Where(i => i.status_amizade == 1).ToListAsync();

                    int qtdamiz = Amizades.Count() * 2;
                    int qtduser = Usuarios.Count();

                    //var media = (qtdamiz)/qtduser;
                    float media = qtdamiz / float.Parse(Usuarios.Count() + "");

                    return Ok(media);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


        [ActionName("DeleteAmizade")]
        [HttpPost]
        public async Task<IActionResult> DeleteAmizade([FromBody] AmizadeDto requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0005_amizade Amizade = await db.tbl_0005_amizade.Where(i => (i.solicitante_amizade == requestBody.user1 && i.recebidor_amizade == requestBody.user2) || (i.solicitante_amizade == requestBody.user2 && i.recebidor_amizade == requestBody.user1)).FirstOrDefaultAsync();

                    db.Entry(Amizade).State = EntityState.Deleted;
                    db.SaveChanges();
                    return Ok(0);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

    }
}
