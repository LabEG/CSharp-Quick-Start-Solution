using System.Collections.Generic;

namespace SampleSolution.Core.Models.ViewModels.Pagination
{
    public class PagedList<TEntity>
    {
        public PageMeta PageMeta { get; set; } = new PageMeta();
        public IList<TEntity> Elements { get; set; } = new List<TEntity>();
    }
}