using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SampleSolution.Backend.Migrations.MainDb
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "sample_solution_main");

            migrationBuilder.CreateTable(
                name: "article_bodies",
                schema: "sample_solution_main",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    body = table.Column<string>(nullable: true),
                    created_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    last_update_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_article_bodies", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "configs",
                schema: "sample_solution_main",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    last_update_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    name = table.Column<string>(nullable: true),
                    value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_configs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                schema: "sample_solution_main",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    last_update_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "articles",
                schema: "sample_solution_main",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    annotation = table.Column<string>(nullable: true),
                    article_body_id = table.Column<long>(nullable: false),
                    author_id = table.Column<long>(nullable: false),
                    created_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    last_update_time = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    sub_title = table.Column<string>(nullable: true),
                    title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_articles", x => x.id);
                    table.ForeignKey(
                        name: "fk_articles_article_bodies_article_body_id",
                        column: x => x.article_body_id,
                        principalSchema: "sample_solution_main",
                        principalTable: "article_bodies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_articles_users_author_id",
                        column: x => x.author_id,
                        principalSchema: "sample_solution_main",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_articles_article_body_id",
                schema: "sample_solution_main",
                table: "articles",
                column: "article_body_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_articles_author_id",
                schema: "sample_solution_main",
                table: "articles",
                column: "author_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "articles",
                schema: "sample_solution_main");

            migrationBuilder.DropTable(
                name: "configs",
                schema: "sample_solution_main");

            migrationBuilder.DropTable(
                name: "article_bodies",
                schema: "sample_solution_main");

            migrationBuilder.DropTable(
                name: "users",
                schema: "sample_solution_main");
        }
    }
}
