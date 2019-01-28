namespace SampleSolution.Core.Models.ViewModels.Pagination
{
    public class PagedListQueryFilter
    {
        public string Property { get; set; }
        public string Value { get; set; }
        public PagedListQueryFilterMethod Method { get; set; }
    }
}