using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using SampleSolution.Core.Models.Entities;
using SampleSolution.Core.Models.Entities.Base;

// many-to-many
// https://docs.microsoft.com/en-us/ef/core/modeling/relationships#many-to-many

namespace SampleSolution.ServerCore.DBContexts
{
    public class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {
        }

        public DbSet<Config> Configs { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleBody> ArticleBodies { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("sample_solution_main");

            Entity<long> tEntity = new Entity<long>();

            // to snake case all tables with all columns
            foreach (IMutableEntityType entity in modelBuilder.Model.GetEntityTypes())
            {
                modelBuilder.Entity(entity.Name).Property(nameof(tEntity.Id)).ValueGeneratedOnAdd();
                modelBuilder.Entity(entity.Name).Property(nameof(tEntity.CreatedTime))
                    .HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAdd();
                modelBuilder.Entity(entity.Name).Property(nameof(tEntity.LastUpdateTime))
                    .HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAddOrUpdate();

                // Replace table names
                entity.Relational().TableName = entity.Relational().TableName.ToSnakeCase();

                // Replace column names
                foreach (IMutableProperty property in entity.GetProperties())
                {
                    property.Relational().ColumnName = property.Name.ToSnakeCase();
                }

                foreach (IMutableKey key in entity.GetKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (IMutableForeignKey key in entity.GetForeignKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (IMutableIndex index in entity.GetIndexes())
                {
                    index.Relational().Name = index.Relational().Name.ToSnakeCase();
                }
            }

            // Article
            modelBuilder.Entity<Article>()
                .HasOne(x => x.ArticleBody)
                .WithOne()
                .HasForeignKey<Article>(x => x.ArticleBodyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Article>()
                .HasOne(x => x.Author)
                .WithMany()
                .HasForeignKey(x => x.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            // https://docs.microsoft.com/en-us/ef/core/saving/cascade-delete
            // https://andrewlock.net/customising-asp-net-core-identity-ef-core-naming-conventions-for-postgresql/
        }

        public void Initialize()
        {
            if (this.Database.EnsureCreated())
            {
                // init code
            }
        }
    }
}