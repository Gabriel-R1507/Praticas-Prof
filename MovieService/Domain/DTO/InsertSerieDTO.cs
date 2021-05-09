using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain.DTO
{
    public class InsertSerieDTO
    {
        public string titulo { get; set; }

        public string pais { get; set; }

        public int ano { get; set; }

        public string diretor { get; set; }

        public string elenco { get; set; }

        public int temporadas { get; set; }
    }
}
