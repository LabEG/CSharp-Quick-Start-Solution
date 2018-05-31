using Microsoft.EntityFrameworkCore;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Services.IServices.Base;

namespace SampleSolution.ServerCore.IServices.Base
{
    public interface ICrudDbService<TDbContext, TEntity, TId> : ICrudService<TEntity, TId>
        where TDbContext : DbContext
        where TEntity : class, IEntity<TId>, new()
    {
    }
}