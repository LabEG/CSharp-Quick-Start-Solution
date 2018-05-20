using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using SampleSolution.Core.Models.Entities.Base;

namespace SampleSolution.Core.Models.Entities
{
    public class User : IdentityUser, IEntity<string>
    {
        public DateTime CreatedTime { get; set; }
        public DateTime LastUpdateTime { get; set; }
    }
}