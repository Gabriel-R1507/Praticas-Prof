using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain
{
    public class tbl_0002_filme
    {
        [Key]
        public int cd_filme { get; set; }

        public string titulo_filme { get; set; }

        public string diretor_filme { get; set; }

        public string elenco_filme { get; set; }

        public string pais_filme { get; set; }
           
       public string ano_filme { get; set; }

    }
}
