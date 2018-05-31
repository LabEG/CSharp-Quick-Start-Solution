using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;
using SampleSolution.Core.Repositories.Base;
using SampleSolution.Core.Repositories.IRepositories.Base;
using SampleSolution.Core.Services.Base;
using SampleSolution.ServerCore.IServices.Base;

namespace SampleSolution.ServerCore.Services.Base
{
    public class CrudDbService<TDbContext, TEntity, TId> : ICrudDbService<TDbContext, TEntity, TId>
    where TDbContext : DbContext
    where TEntity : class, IEntity<TId>, new()
    {
        protected TDbContext DBContext { get; }
        protected ICrudDbRepository<TDbContext, TEntity, TId> Repository { get; }

        public CrudDbService(TDbContext dbContext, ICrudDbRepository<TDbContext, TEntity, TId> repository)
        {
            this.DBContext = dbContext;
            this.Repository = repository;
        }

        public virtual async Task<TEntity> Create(TEntity entity)
        {
            TEntity resultEntity = await this.Repository.Create(entity);
            await this.SaveContext();
            return resultEntity;
        }

        public virtual async Task<TEntity> GetById(TId id)
        {
            TEntity resultEntity = await this.Repository.GetById(id);
            await this.SaveContext();
            return resultEntity;
        }

        public virtual async Task<IList<TEntity>> GetAll()
        {
            IList<TEntity> resultEntities = await this.Repository.GetAll();
            return resultEntities;
        }

        public virtual async Task Update(TId id, TEntity entity)
        {
            try
            {
                await this.Repository.Update(id, entity);
                await this.SaveContext();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public virtual async Task Delete(TId id)
        {
            await this.Repository.Delete(id);
            await this.SaveContext();
        }

        public virtual async Task<PagedList<TEntity>> GetPaged(PagedListQuery query)
        {
            return await this.Repository.GetPaged(query);
        }

        public virtual async Task<TEntity> GetGraph(TId id, JObject graph)
        {
            return await this.Repository.GetGraph(id, graph);
        }

        protected virtual async Task SaveContext()
        {
            await this.DBContext.SaveChangesAsync();
        }
    }
}