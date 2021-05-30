using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain
{
    public class tbl_0004_joinha
    {
        [Key]
        public int cd_joinha { get; set; }

        public int avaliacao { get; set; }

        public int usuario { get; set; }
    }
}
