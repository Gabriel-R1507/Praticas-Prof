using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MovieService.Domain
{
    public class tbl_0001_user
    {
        [Key]
        public int cd_user { get; set; }
        
        [StringLength(200)]
        public string email_user { get; set; }
        
        [StringLength(200)]
        public string senha_user { get; set; }

        [StringLength(100)]
        public string nm_user { get; set; }
        
        [StringLength(20)]
        public string dt_nasc { get; set; }

        [StringLength(50)]
        public string cidd_user { get; set; }

        [StringLength(50)]
        public string estd_user { get; set; }

    }
}
