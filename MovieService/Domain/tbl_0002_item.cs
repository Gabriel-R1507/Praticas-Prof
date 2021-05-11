using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain
{
    public class tbl_0002_item
    {
        [Key]
        public int cd_item { get; set; }

        public string titulo_item { get; set; }

        public string descricao_item { get; set; }

        public int criador_item { get; set; }

        public int tipo_item { get; set; }

        public bool aceito_item { get; set; }
    }
}
