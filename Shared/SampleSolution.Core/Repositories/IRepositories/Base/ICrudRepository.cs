using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;

namespace SampleSolution.Core.Repositories.IRepositories.Base
{
    public interface ICrudRepository<TEntity, TId>
        where TEntity : class, IEntity<TId>, new()
    {
        Task<TEntity> Create(TEntity entity);

        Task Delete(TId id);

        Task<IList<TEntity>> GetAll();

        Task<TEntity> GetById(TId id);

        Task Update(TId id, TEntity entity);

        Task<PagedList<TEntity>> GetPaged(PagedListQuery query, IQueryable<TEntity> data = null);

        Task<TEntity> GetGraph(TId id, JObject graph);
    }
}