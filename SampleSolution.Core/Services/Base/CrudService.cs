using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;
using SampleSolution.Core.Repositories.Base;

namespace SampleSolution.Core.Services.Base
{
    public class CrudService<TEntity, TId> : ICrudService<TEntity, TId>
        where TEntity : class, IEntity<TId>, new()
    {
        protected ICrudRepository<TEntity, TId> Repository { get; }

        public CrudService(ICrudRepository<TEntity, TId> repository)
        {
            this.Repository = repository;
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            return await this.Repository.Create(entity);
        }

        public async Task Delete(TId id)
        {
            await this.Repository.Delete(id);
        }

        public async Task<TEntity> GetById(TId id)
        {
            return await this.Repository.GetById(id);
        }

        public async Task<IList<TEntity>> GetAll()
        {
            return await this.Repository.GetAll();
        }

        public async Task Update(TId id, TEntity entity)
        {
            await this.Repository.Update(id, entity);
        }

        public async Task<PagedList<TEntity>> GetPaged(PagedListQuery query)
        {
            return await this.Repository.GetPaged(query);
        }

        public async Task<TEntity> GetGraph(TId id, JObject graph)
        {
            return await this.Repository.GetGraph(id, graph);
        }
    }
}