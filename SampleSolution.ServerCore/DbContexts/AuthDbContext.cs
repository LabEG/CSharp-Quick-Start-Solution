using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.ServerCore.DbContexts
{
    public class AuthUser : IdentityUser, IEntity<string>
    {
        // add property here
        public new string Id { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime LastUpdateTime { get; set; }
    }

    public class AuthDbContext : IdentityDbContext<AuthUser>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.HasDefaultSchema("sample_solution_auth");

            foreach (var entity in builder.Model.GetEntityTypes())
            {
                // Replace table names
                entity.Relational().TableName = entity.Relational().TableName.ToSnakeCase();

                // Replace column names
                foreach (var property in entity.GetProperties())
                {
                    property.Relational().ColumnName = property.Name.ToSnakeCase();
                }

                foreach (var key in entity.GetKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (var key in entity.GetForeignKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (var index in entity.GetIndexes())
                {
                    index.Relational().Name = index.Relational().Name.ToSnakeCase();
                }
            }
        }

        public void Initialize(UserManager<AuthUser> userManager)
        {
            if (this.Database.EnsureCreated())
            {
                // init code
                AuthUser admin = new AuthUser { UserName = "Admin", Email = "admin@admin.admin" };
                userManager.CreateAsync(admin, "Qwert12345!@#$%").Wait();
            }
        }
    }
}