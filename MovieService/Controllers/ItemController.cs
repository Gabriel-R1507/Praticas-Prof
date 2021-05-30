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
    public class ItemController : ControllerBase
    {

        [ActionName("GetById")]
        [HttpPost]
        public async Task<IActionResult> GetById([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0002_item Item = await db.tbl_0002_item.Where(i => i.cd_item == requestBody).FirstOrDefaultAsync();

                    return Ok(Item);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("InsertItem")]
        [HttpPost]
        public async Task<IActionResult> InsertFilme([FromBody] InsertItemDTO requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0002_item Item = new tbl_0002_item();
                    Item.titulo_item = requestBody.titulo_item;
                    Item.descricao_item = requestBody.descricao_item;
                    Item.criador_item = requestBody.criador_item;
                    Item.tipo_item = requestBody.tipo_item;
                    Item.aceito_item = 0;

                    db.tbl_0002_item.Add(Item);
                    db.SaveChanges();

                    tbl_0002_item Resp = await db.tbl_0002_item.Where(i => i.titulo_item == requestBody.titulo_item && i.tipo_item == requestBody.tipo_item).FirstOrDefaultAsync();
                    return Ok(Resp.cd_item);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        
        [ActionName("GetItensToAprove")]
        [HttpPost]
        public async Task<IActionResult> GetItensToAprove()
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    List<tbl_0002_item> Itens = await db.tbl_0002_item.Where(i => i.aceito_item == 0).ToListAsync();

                    return Ok(Itens);
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
                    List<tbl_0002_item> Itens = await db.tbl_0002_item.Where(i => EF.Functions.Like(i.titulo_item, "%" + requestBody + "%") && i.aceito_item == 1).ToListAsync();

                    return Ok(Itens);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("Aprovar")]
        [HttpPost]
        public async Task<IActionResult> Aprovar([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {

                    tbl_0002_item Item = await db.tbl_0002_item.Where(r => r.cd_item == requestBody).FirstOrDefaultAsync();

                    Item.aceito_item = 1;

                    db.Entry(Item).State = EntityState.Modified;
                    db.SaveChanges();

                    return Ok(Item.cd_item);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [ActionName("Negar")]
        [HttpPost]
        public async Task<IActionResult> Negar([FromBody] int requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {

                    tbl_0002_item Item = await db.tbl_0002_item.Where(r => r.cd_item == requestBody).FirstOrDefaultAsync();

                    Item.aceito_item = 1;

                    db.Entry(Item).State = EntityState.Modified;
                    db.SaveChanges();

                    return Ok(Item.cd_item);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
