using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain
{
    public class tbl_0003_livro
    {
        [Key]
        public int cd_livro { get; set; }

        [StringLength(200)]
        public string titulo_livro { get; set; }

        [StringLength(200)]
        public string autor_livro { get; set; }

        [StringLength(50)]
        public string editora_livro { get; set; }

        [StringLength(50)]
        public string pais_livro { get; set; }

        public int ano_livro { get; set; }
    }
}
