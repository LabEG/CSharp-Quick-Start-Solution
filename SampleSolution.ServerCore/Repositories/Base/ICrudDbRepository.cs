using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Repositories.Base
{
    public interface ICrudDbRepository<TDbContext, TEntity, TId> : ICrudRepository<TEntity, TId>
        where TDbContext : DbContext
        where TEntity : class, IEntity<TId>, new()
    {
    }
}