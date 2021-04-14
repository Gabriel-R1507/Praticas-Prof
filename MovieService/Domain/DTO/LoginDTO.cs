using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Domain.DTO
{
    public class LoginDTO
    {
        [StringLength(200)]
        public string email_user { get; set; }

        [StringLength(200)]
        public string senha_user { get; set; }
    }
}
