using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;
using SampleSolution.Core.Repositories.Base;

namespace SampleSolution.Core.Services.IServices.Base
{
    public interface ICrudService<TEntity, TId>
        where TEntity : class, IEntity<TId>, new()
    {
        Task<TEntity> Create(TEntity entity);

        Task Delete(TId id);

        Task<IList<TEntity>> GetAll();

        Task<TEntity> GetById(TId id);

        Task Update(TId id, TEntity entity);

        Task<PagedList<TEntity>> GetPaged(PagedListQuery query);

        Task<TEntity> GetGraph(TId id, JObject graph);
    }
}