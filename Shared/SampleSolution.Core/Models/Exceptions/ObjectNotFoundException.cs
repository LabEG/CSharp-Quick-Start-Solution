using System;

namespace SampleSolution.Core.Models.Exceptions
{
    public class ObjectNotFoundException : Exception
    {
        public override string Message => base.Message is string ? base.Message : "Object Not Found";

        public ObjectNotFoundException()
        {
        }

        public ObjectNotFoundException(string message) : base(message)
        {
        }

        public ObjectNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}