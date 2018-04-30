using System;

namespace SampleSolution.Core.Models.Entities.Base
{
    public class Entity<T> : IEntity<T>
    {
        public T Id { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime LastUpdateTime { get; set; }
    }
}