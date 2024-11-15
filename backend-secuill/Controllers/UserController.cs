using backend_secuill.Interface;
using backend_secuill.Models.Drugs;
using backend_secuill.Models.User;
using backend_secuill.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ILogger<MiddleController> _logger;
        private readonly ConhisMiddleV4UbchContext _dbContext;
        private readonly IUsersRepository _IUsers;
        private readonly IAuthenRepository _IauthenRepository;
        public UserController(ILogger<MiddleController> logger, ConhisMiddleV4UbchContext dbContext, IUsersRepository IUsers, IAuthenRepository authenRepository)
        {
            _logger = logger;
            _dbContext = dbContext;
            _IUsers = IUsers;
            _IauthenRepository = authenRepository;
        }

        //[Authorize]
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var res = _IUsers.GetAllUsers().Result;
            return Ok(new SendResponseModel(200, "OK", res));
        }

        [Authorize]
        [HttpGet("GetUserPermission")]
        public async Task<IActionResult> GetUserPermission()
        {
            var res = _IUsers.GetUserPermission().Result;
            return Ok(new SendResponseModel(200, "OK", res));
        }

        [Authorize]
        [HttpGet("GetWardMaster")]
        public async Task<IActionResult> GetWardMaster()
        {
            var res = _IUsers.GetWardMaster().Result;
            return Ok(new SendResponseModel(200, "OK", res));
        }

        [Authorize]
        [HttpPatch("UpdateMUsers")]
        public async Task<IActionResult> UpdateMUsers([FromBody] bodyUpdateMUsers bodyUser)
        {
            var result = await _IUsers.UpdateMUsers(bodyUser);
            switch (result)
            {
                case true:
                    return Ok(new SendResponseModel(200, "OK", null));
                    break;
                default:
                    return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, "Fail", null));
                    break;
            }
        }

    }
}
