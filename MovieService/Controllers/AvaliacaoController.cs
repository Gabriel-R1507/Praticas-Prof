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

        [ActionName("CreateAvaliacao")]
        [HttpPost]
        public async Task<IActionResult> CreateAvaliacao([FromBody] tbl_0003_avaliacao requestBody)
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
                    List<ItemResponseDTO> Response = new List<ItemResponseDTO>();
                    ItemResponseDTO Unit = new ItemResponseDTO();

                    List<tbl_0003_avaliacao> Avaliacoes = await db.tbl_0003_avaliacao.Where(i => i.item == requestBody).ToListAsync();

                    foreach (tbl_0003_avaliacao aval in Avaliacoes)
                    {

                        List<tbl_0004_joinha> Joinhas = await db.tbl_0004_joinha.Where(i => i.avaliacao == aval.cd_avaliacao).ToListAsync();
                        tbl_0001_user Usuario = await db.tbl_0001_user.Where(i => i.cd_user == aval.usuario).FirstOrDefaultAsync();


                        Unit.aval = aval.cd_avaliacao;
                        Unit.valor = aval.valor;
                        Unit.cd_usuario = Usuario.cd_user;
                        Unit.nm_usuario = Usuario.nm_user;
                        Unit.comentario = aval.comentario;
                        Unit.joinhas = Joinhas;

                        Response.Add(Unit);
                    }
                    int temp = Response[1].joinhas.Count;
                    Response.Sort(Response);

                    return Ok(Response);
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
                    List<UserResponseDTO> Response = new List<UserResponseDTO>();
                    List<tbl_0003_avaliacao> Avaliacoes = await db.tbl_0003_avaliacao.Where(i => i.usuario == requestBody).ToListAsync();
                    foreach (tbl_0003_avaliacao aval in Avaliacoes)
                    {
                        tbl_0002_item Item = await db.tbl_0002_item.Where(i => i.cd_item == aval.item).FirstOrDefaultAsync();
                        List<tbl_0004_joinha> joinhas = await db.tbl_0004_joinha.Where(i => i.avaliacao == aval.cd_avaliacao).ToListAsync();
                        
                        UserResponseDTO Unit = new UserResponseDTO();
                        Unit.valor = aval.valor;
                        Unit.item = Item.titulo_item;
                        //Unit.comentario = aval.comentario;
                        Unit.joinhas = joinhas;

                        Response.Add(Unit);
                    }
                    return Ok(Response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }


    }
}
