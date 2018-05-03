using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;
using SampleSolution.Core.Repositories.Base;
using SampleSolution.Core.Services.Base;

namespace SampleSolution.ServerCore.Services.Base
{
    public class DbCrudService<TDbContext, TRepository, TEntity, TId> : ICrudDbService<TDbContext, TRepository, TEntity, TId>
    where TDbContext : DbContext
    where TRepository : class, ICrudDbRepository<TDbContext, TEntity, TId>
    where TEntity : class, IEntity<TId>, new()
    {
        protected TDbContext DBContext { get; }
        protected TRepository Repository { get; }

        public DbCrudService(TDbContext dbContext, TRepository repository)
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