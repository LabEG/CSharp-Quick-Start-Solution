using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Models.ViewModels.Pagination;
using SampleSolution.Core.Repositories.Base;

namespace SampleSolution.Core.Services.Base
{
    public interface ICrudDbService<TDbContext, TRepository, TEntity, TId> : ICrudService<TRepository, TEntity, TId>
        where TDbContext : DbContext
        where TRepository : class, ICrudRepository<TEntity, TId>
        where TEntity : class, IEntity<TId>, new()
    {
    }
}