using System;

namespace SampleSolution.Core.Models.Entities.Base
{
    public interface IEntity<T>
    {
        T Id { get; set; }
        DateTime CreatedTime { get; set; }
        DateTime LastUpdateTime { get; set; }
    }
}