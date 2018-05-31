using Microsoft.AspNetCore.Mvc;
using SampleSolution.ServerCore.Controllers.Base;
using SampleSolution.ServerCore.DbContexts;
using SampleSolution.ServerCore.IServices.Base;

namespace SampleSolution.Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/authuser")]
    public class AuthUserController : CrudController<AuthUser, string>
    {
        public AuthUserController(ICrudDbService<AuthDbContext, AuthUser, string> service) : base(service)
        {
        }
    }
}