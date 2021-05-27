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

        [ActionName("GetByName")]
        [HttpPost]
        public async Task<IActionResult> GetByName([FromBody] string requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<tbl_0001_user> Clientes = await db.tbl_0001_user.Where(i => EF.Functions.Like(i.nm_user, "%" + requestBody + "%")).ToListAsync();

                    return Ok(Clientes);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("UpdateClie")]
        [HttpPost]
        public async Task<IActionResult> UpdateClie([FromBody] tbl_0001_user requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {

                    tbl_0001_user Cliente = await db.tbl_0001_user.Where(r => r.cd_user == requestBody.cd_user).FirstOrDefaultAsync();

                    Cliente.nm_user = requestBody.nm_user;
                    Cliente.dt_nasc = requestBody.dt_nasc;
                    Cliente.estd_user = requestBody.estd_user;
                    Cliente.cidd_user = requestBody.cidd_user;

                    db.Entry(Cliente).State = EntityState.Modified;
                    db.SaveChanges();

                    return Ok(Cliente.cd_user);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("GetComum")]
        [HttpPost]
        public async Task<IActionResult> GetComum([FromBody] AmizadeDto requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<int> comum = new List<int>();
                    List<tbl_0001_user> Response = new List<tbl_0001_user>();

                    List<int> Amizades1 = await db.tbl_0005_amizade
                                                .Where(i => i.solicitante_amizade == requestBody.user1)
                                                .Select(x => x.recebidor_amizade)
                                                .Union(db.tbl_0005_amizade
                                                .Where(i => i.recebidor_amizade == requestBody.user1)
                                                .Select(x => x.solicitante_amizade)).ToListAsync();

                    List<int> Amizades2 = await db.tbl_0005_amizade
                                                .Where(i => i.solicitante_amizade == requestBody.user2)
                                                .Select(x => x.recebidor_amizade)
                                                .Union(db.tbl_0005_amizade
                                                .Where(i => i.recebidor_amizade == requestBody.user2)
                                                .Select(x => x.solicitante_amizade)).ToListAsync();

                    foreach (int amiz in Amizades1)
                    {
                        if (Amizades2.Contains(amiz))
                        {
                            tbl_0001_user unit = await db.tbl_0001_user.Where(i => i.cd_user == amiz).FirstOrDefaultAsync();
                            Response.Add(unit);
                        }
                    }

                    return Ok(Response.Count);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
