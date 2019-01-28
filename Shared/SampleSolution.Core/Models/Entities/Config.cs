using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Models.Entities
{
    public class Config : Entity<long>
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}