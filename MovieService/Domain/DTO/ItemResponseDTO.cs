using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain.DTO
{
    public class ItemResponseDTO
    {
        public int valor { get; set; }

        public int aval { get; set; }

        public int cd_usuario { get; set; }

        public string nm_usuario { get; set; }

        public string comentario { get; set; }

        public List<tbl_0004_joinha> joinhas { get; set; }
    }
}
