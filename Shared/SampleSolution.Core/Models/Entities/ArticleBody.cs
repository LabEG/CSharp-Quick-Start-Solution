using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Models.Entities
{
    public class ArticleBody : Entity<long>
    {
        public string Body { get; set; }
    }
}