using Microsoft.AspNetCore.Mvc;
using SampleSolution.Core.Models.Entities;
using SampleSolution.Core.Services.Base;
using SampleSolution.ServerCore.Controllers.Base;

namespace SampleSolution.Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/config")]
    public class ConfigController : CrudController<Config, long>
    {
        public ConfigController(ICrudService<Config, long> service) : base(service)
        {
        }
    }
}