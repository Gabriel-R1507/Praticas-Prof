using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain.DTO
{
    public class UserResponseDTO
    {
        public int cd_aval { get; set; }
        public int valor { get; set; }

        public string item { get; set; }

        public string comentario { get; set; }

        public List<tbl_0004_joinha> joinhas { get; set; }

    }
}
