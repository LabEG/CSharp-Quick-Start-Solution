using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Models.Entities
{
    public class Article : Entity<long>
    {
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Annotation { get; set; }

        public ArticleBody ArticleBody { get; set; }
        public long ArticleBodyId { get; set; }

        public User Author { get; set; }
        public long AuthorId { get; set; }
    }
}