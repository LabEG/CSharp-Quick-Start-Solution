using Microsoft.AspNetCore.Mvc;
using SampleSolution.Core.Models.Entities;
using SampleSolution.ServerCore.Controllers.Base;
using SampleSolution.ServerCore.DBContexts;
using SampleSolution.ServerCore.IServices.Base;

namespace SampleSolution.Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/config")]
    public class ConfigController : CrudController<Config, long>
    {
        public ConfigController(ICrudDbService<MainDbContext, Config, long> service) : base(service)
        {
        }
    }
}