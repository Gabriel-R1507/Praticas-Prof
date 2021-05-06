using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain
{
    public class tbl_0005_amizade
    {
        [Key]
        public int cd_amizade { get; set; }

        public int solicitante_amizade { get; set; }

        public int recebidor_amizade { get; set; }

        public DateTime data_amizade { get; set; }

        public bool status_amizade { get; set; }
    }
}
