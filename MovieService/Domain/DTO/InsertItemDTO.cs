using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain.DTO
{
    public class InsertItemDTO
    {
        public string titulo_item { get; set; }

        public string descricao_item { get; set; }

        public int criador_item { get; set; }

        public int tipo_item { get; set; }
    }
      
}
