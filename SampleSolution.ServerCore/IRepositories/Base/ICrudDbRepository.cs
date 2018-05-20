using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SampleSolution.Core.Models.Entities.Base;
using SampleSolution.Core.Repositories.Base;

namespace SampleSolution.Core.IRepositories.Base
{
    public interface ICrudDbRepository<TDbContext, TEntity, TId> : ICrudRepository<TEntity, TId>
        where TDbContext : DbContext
        where TEntity : class, IEntity<TId>, new()
    {
    }
}