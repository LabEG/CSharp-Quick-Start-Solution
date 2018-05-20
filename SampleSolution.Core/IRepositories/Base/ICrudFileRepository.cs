using System;
using System.Collections.Generic;
using System.Text;
using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Repositories.Base
{
    public interface ICrudFileRepository<TEntity, TId> : ICrudRepository<TEntity, TId>
        where TEntity : class, IEntity<TId>, new()
    {
    }
}