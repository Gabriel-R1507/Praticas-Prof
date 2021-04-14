using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace MovieService.Domain
{
    public class tbl_0004_serie
    {
        [Key]
        public int cd_serie { get; set; }

        public string titulo_serie { get; set; }

        public string diretor_serie { get; set; }

        public string elenco_serie { get; set; }

        public string pais_serie { get; set; }

        public string ano_serie { get; set; }

        public int temporadas_serie { get; set; }

    }
}
