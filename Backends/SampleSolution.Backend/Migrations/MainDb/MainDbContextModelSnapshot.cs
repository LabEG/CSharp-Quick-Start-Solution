﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SampleSolution.ServerCore.DBContexts;

namespace SampleSolution.Backend.Migrations.MainDb
{
    [DbContext(typeof(MainDbContext))]
    partial class MainDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("sample_solution_main")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.0-rtm-30799")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("SampleSolution.Core.Models.Entities.Article", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<string>("Annotation")
                        .HasColumnName("annotation");

                    b.Property<long>("ArticleBodyId")
                        .HasColumnName("article_body_id");

                    b.Property<long>("AuthorId")
                        .HasColumnName("author_id");

                    b.Property<DateTime>("CreatedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("created_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime>("LastUpdateTime")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("last_update_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("SubTitle")
                        .HasColumnName("sub_title");

                    b.Property<string>("Title")
                        .HasColumnName("title");

                    b.HasKey("Id")
                        .HasName("pk_articles");

                    b.HasIndex("ArticleBodyId")
                        .IsUnique()
                        .HasName("ix_articles_article_body_id");

                    b.HasIndex("AuthorId")
                        .HasName("ix_articles_author_id");

                    b.ToTable("articles");
                });

            modelBuilder.Entity("SampleSolution.Core.Models.Entities.ArticleBody", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<string>("Body")
                        .HasColumnName("body");

                    b.Property<DateTime>("CreatedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("created_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime>("LastUpdateTime")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("last_update_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("Id")
                        .HasName("pk_article_bodies");

                    b.ToTable("article_bodies");
                });

            modelBuilder.Entity("SampleSolution.Core.Models.Entities.Config", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("created_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime>("LastUpdateTime")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("last_update_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Name")
                        .HasColumnName("name");

                    b.Property<string>("Value")
                        .HasColumnName("value");

                    b.HasKey("Id")
                        .HasName("pk_configs");

                    b.ToTable("configs");
                });

            modelBuilder.Entity("SampleSolution.Core.Models.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("created_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime>("LastUpdateTime")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("last_update_time")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.ToTable("users");
                });

            modelBuilder.Entity("SampleSolution.Core.Models.Entities.Article", b =>
                {
                    b.HasOne("SampleSolution.Core.Models.Entities.ArticleBody", "ArticleBody")
                        .WithOne()
                        .HasForeignKey("SampleSolution.Core.Models.Entities.Article", "ArticleBodyId")
                        .HasConstraintName("fk_articles_article_bodies_article_body_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SampleSolution.Core.Models.Entities.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .HasConstraintName("fk_articles_users_author_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}