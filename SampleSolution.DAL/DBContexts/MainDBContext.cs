using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using SampleSolution.Core.Models.Entities;
using SampleSolution.Core.Models.Entities.Base;

// many-to-many
// https://docs.microsoft.com/en-us/ef/core/modeling/relationships#many-to-many

namespace SampleSolution.DAL.DBContexts
{
    public class MainDBContext : DbContext
    {
        public MainDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Config> Configs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("sample_solution");

            Entity<long> tEntity = new Entity<long>();

            // to snake case all tables with all columns
            foreach (IMutableEntityType entity in modelBuilder.Model.GetEntityTypes())
            {
                string[] fullNames = entity.Name.Split('.'); // because Name with namespaces
                string entityName = fullNames[fullNames.Length - 1];
                string tableName = string
                    .Concat(entityName.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString()))
                    .ToLower();

                modelBuilder.Entity(entity.Name).ToTable(tableName);
                modelBuilder.Entity(entity.Name).Property(nameof(tEntity.Id)).ValueGeneratedOnAdd();
                modelBuilder.Entity(entity.Name).Property(nameof(tEntity.CreatedTime))
                    .HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAdd();
                modelBuilder.Entity(entity.Name).Property(nameof(tEntity.LastUpdateTime))
                    .HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAddOrUpdate();

                entity.GetProperties().ToList().ForEach(p =>
                {
                    modelBuilder.Entity(entity.Name).Property(p.Name).HasColumnName(ToSnakeCase(p.Name));
                });
            }

            // https://docs.microsoft.com/en-us/ef/core/saving/cascade-delete
        }

        public void Initialize()
        {
            //this.Database.EnsureDeleted();
            if (this.Database.EnsureCreated())
            {
                // init code
            }
        }

        private string ToSnakeCase(string sourceString)
        {
            return string
                .Concat(sourceString.Select((x, i) =>
                {
                    char ch = i > 0 ? sourceString.ToCharArray()[i - 1] : '\0';
                    return i > 0 && char.IsUpper(x) && !char.IsUpper(ch) ? "_" + x.ToString() : x.ToString();
                }))
                .ToLower();
        }
    }
}