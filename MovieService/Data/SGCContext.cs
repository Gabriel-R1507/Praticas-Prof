using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MovieService.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MovieService.Data
{
    public class SGCContext : DbContext
    {
        private SqlConnection sqlConnection { get;set;}

        #region
        public DbSet<tbl_0001_user> tbl_0001_user { get; set; }
        public DbSet<tbl_0002_item> tbl_0002_item { get; set; }
        public DbSet<tbl_0003_avaliacao> tbl_0003_avaliacao { get; set; }
        public DbSet<tbl_0004_joinha> tbl_0004_joinha { get; set; }
        public DbSet<tbl_0005_amizade> tbl_0005_amizade { get; set; }
        #endregion

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

            sqlConnection = new SqlConnection(config.GetConnectionString("SGCConnection"));
            optionsBuilder.UseSqlServer(sqlConnection);
        }

        //public async Task<List<T>> executeSqlListAsync<T>(String sSQL)
        //{
        //    using (SqlCommand sqlCommand = new SqlCommand(sSQL, sqlConnection))
        //    {
        //        using (DbDataReader oracleDataReader = sqlCommand.ExecuteReader())
        //        {
        //            if (oracleDataReader.HasRows)
        //            {
        //                return DataReaderMapToList<T>(oracleDataReader);
        //            }
        //            else
        //            {
        //                return new List<T>();
        //            }
        //        }
        //    }
        //}

        //public List<T> DataReaderMapToList<T>(IDataReader dr)
        //{
        //    List<T> list = new List<T>();
        //    T obj = default(T);
        //    while (dr.Read())
        //    {
        //        obj = Activator.CreateInstance<T>();
        //        foreach (PropertyInfo prop in obj.GetType().GetProperties())
        //        {
        //            if (!object.Equals(dr[prop.Name], DBNull.Value))
        //            {
        //                prop.SetValue(obj, dr[prop.Name], null);
        //            }
        //        }
        //        list.Add(obj);
        //    }
        //    return list;
        //}
    }
}
