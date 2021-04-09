using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MovieService.Domain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MovieService.Data
{
    public class SGCContext : DbContext
    {
        public DbSet<tbl_0001_user> tbl_0001_user { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("SGCConnection"));
        }
    }
}
