using Microsoft.AspNetCore.Mvc;
using SampleSolution.Core.Models.Entities;
using SampleSolution.Core.Repositories.Base;
using SampleSolution.Core.Services.Base;
using SampleSolution.ServerCore.Controllers.Base;
using SampleSolution.ServerCore.DbContexts;
using SampleSolution.ServerCore.DBContexts;
using SampleSolution.ServerCore.IServices.Base;
using SampleSolution.ServerCore.Services.Base;

namespace SampleSolution.Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/user")]
    public class UserController : CrudController<AuthUser, string>
    {
        public UserController(ICrudDbService<AuthDbContext, AuthUser, string> service) : base(service)
        {
        }
    }
}