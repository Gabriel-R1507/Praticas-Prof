using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain.DTO
{
    public class InsertLivroDTO
    {
        public string titulo { get; set; }

        public string pais { get; set; }

        public int ano { get; set; }

        public string autor { get; set; }

        public string editora { get; set; }
    }
}
