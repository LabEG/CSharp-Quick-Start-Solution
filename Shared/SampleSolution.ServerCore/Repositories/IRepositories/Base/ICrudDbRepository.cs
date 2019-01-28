using Microsoft.EntityFrameworkCore;
using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Repositories.IRepositories.Base
{
    public interface ICrudDbRepository<TDbContext, TEntity, TId> : ICrudRepository<TEntity, TId>
        where TDbContext : DbContext
        where TEntity : class, IEntity<TId>, new()
    {
    }
}