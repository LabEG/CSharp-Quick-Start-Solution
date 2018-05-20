using Microsoft.AspNetCore.Mvc;
using SampleSolution.Core.Models.Entities;
using SampleSolution.Core.Repositories.Base;
using SampleSolution.Core.Services.Base;
using SampleSolution.ServerCore.Controllers.Base;
using SampleSolution.ServerCore.DBContexts;
using SampleSolution.ServerCore.IServices.Base;
using SampleSolution.ServerCore.Services.Base;

namespace SampleSolution.Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/user")]
    public class UserController : CrudController<User, string>
    {
        public UserController(ICrudDbService<MainDBContext, User, string> service) : base(service)
        {
        }
    }
}