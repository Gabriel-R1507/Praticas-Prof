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

        [ActionName("InsertLivro")]
        [HttpPost]
        public async Task<IActionResult> InsertFilme([FromBody] InsertLivroDTO requestBody)
        {
            try
            {
                using (SGCContext db = new SGCContext())
                {
                    tbl_0003_livro Livro = new tbl_0003_livro();
                    Livro.titulo_livro = requestBody.titulo;
                    Livro.autor_livro = requestBody.autor;
                    Livro.editora_livro = requestBody.editora;
                    Livro.pais_livro = requestBody.pais;
                    Livro.ano_livro = requestBody.ano;

                    db.tbl_0003_livro.Add(Livro);
                    db.SaveChanges();

                    tbl_0003_livro Resp = await db.tbl_0003_livro.Where(i => i.titulo_livro == requestBody.titulo).FirstOrDefaultAsync();
                    return Ok(Resp.cd_livro);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
