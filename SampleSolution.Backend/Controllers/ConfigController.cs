using Microsoft.AspNetCore.Mvc;
using SampleSolution.Core.Models.Entities;
using SampleSolution.Core.Repositories.Base;
using SampleSolution.Core.Services.Base;
using SampleSolution.ServerCore.Controllers.Base;
using SampleSolution.ServerCore.DBContexts;

namespace SampleSolution.Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/config")]
    public class ConfigController : CrudController<ICrudDbService<MainDBContext, ICrudDbRepository<MainDBContext, Config, long>, Config, long>, Config, long>
    {
        public ConfigController(ICrudDbService<MainDBContext, ICrudDbRepository<MainDBContext, Config, long>, Config, long> service) : base(service)
        {
        }
    }
}