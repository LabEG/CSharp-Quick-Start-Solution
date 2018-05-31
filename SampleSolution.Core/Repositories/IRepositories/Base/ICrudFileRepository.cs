using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Repositories.IRepositories.Base
{
    public interface ICrudFileRepository<TEntity, TId> : ICrudRepository<TEntity, TId>
        where TEntity : class, IEntity<TId>, new()
    {
    }
}