using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain
{
    public class tbl_0003_avaliacao
    {
        public int cd_avaliacao { get; set; }

        public int valor { get; set; }

        public int item { get; set; }

        public int usuario { get; set; }

        [StringLength(1024)]
        public string comentario { get; set; }
    }
}
