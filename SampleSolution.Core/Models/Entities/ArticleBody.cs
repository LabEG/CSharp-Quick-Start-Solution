using System;
using System.Collections.Generic;
using System.Text;
using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Models.Entities
{
    public class ArticleBody : Entity<long>
    {
        public string Body { get; set; }
    }
}