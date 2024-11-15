using backend_secuill.Database;
using backend_secuill.Database.SECUILL;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.Authen;
using backend_secuill.Models.User;
using backend_secuill.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;

namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]

    public class AuthenController : ControllerBase
    {
        private readonly ILogger<AuthenController> _logger;
        private readonly SecuillV5TuContext _dbContext;
        private readonly IUsersRepository _usersRepository;
        private readonly IAuthenRepository _IauthenRepository;
        private readonly IConfiguration config = new ConfigurationBuilder()
                       .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false).Build();
        private readonly string _jwtKey;

        public AuthenController(ILogger<AuthenController> logger, SecuillV5TuContext dbcontext, IUsersRepository IUsersRepository,IAuthenRepository IauthenRepository)
        {
            _logger = logger;
            _dbContext = dbcontext;
            _usersRepository = IUsersRepository;
            _jwtKey = config["Jwt:Key"];
            _IauthenRepository=IauthenRepository;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel userIndentify)
        {

            _logger.LogInformation("login");
            var result = await _dbContext.MUserLogins
                .Join(_dbContext.MUsers,
                      ul => ul.UserId,
                      u => u.UserId,
                      (ul,u)=> new {
                        ul.UserId,
                        ul.UloginUsername,
                        ul.UloginPassward,
                        u.UserFullname,
                        u.PerId,
                        u.UserDepartment,
                        u.UserLocationId,
                        u.UserLocationCode,
                        u.UserLocationName
                      })
                .Join(_dbContext.MPermissions,
                      user => user.PerId,
                      p => p.PerId,
                      (user,p) => new {
                        user.UserId,
                        user.UloginUsername,
                        user.UloginPassward,
                        user.UserFullname,
                        user.PerId,
                        p.PerName,
                        user.UserDepartment,
                        user.UserLocationId,
                        user.UserLocationCode,
                        user.UserLocationName
                      }
                )
                .FirstOrDefaultAsync(user => user.UloginUsername == userIndentify.username
                                                                        && user.UloginPassward == userIndentify.password);

            // get machine master
            var machineMaster = await _dbContext.MMachines.FirstOrDefaultAsync(mc => mc.MachineStatus == "1");

            responseUserModel User = null;       
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor();
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = "";
            if (result != null) { //ถ้ามีข้อมูลใน Master Secuill
                tokenDescriptor = _IauthenRepository.GenerateAccessToken(result.UserId, result.UloginUsername, result.PerName, result.UserFullname);
                var obj_token = tokenHandler.CreateToken(tokenDescriptor);
                token = new JwtSecurityTokenHandler().WriteToken(obj_token);
                User = new responseUserModel
                {
                    UID = result.UserId,
                    UserName = result.UloginUsername,
                    FullName = result.UserFullname,
                    Department = result.UserDepartment,
                    LocationId = result.UserLocationId,
                    LocationCode = result.UserLocationCode,
                    LocationName = result.UserLocationName,
                    PermissionID = result.PerId,
                    PermissionName = result.PerName,
                    MachineNumber = machineMaster.MachineLocationcode,
                    MachineLocationName = machineMaster.MachineLocationname,
                };
            }
            else // ถ้าไม่มีใน Master
            {
                var checkUsername = await _usersRepository.GetByUsernameAsync(userIndentify.username);
                if (checkUsername != null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, new SendResponseModel(401, "Login fail. กรุณาตรวจสอบ UserName & Password ", null));
                }

                responseUserFromHIS resUserFromHIS =await _usersRepository.ResponseUserFromHIS(userIndentify.username);
                if (resUserFromHIS != null)
                {
                    tokenDescriptor = _IauthenRepository.GenerateAccessToken(DateTime.Now.ToString("yyyyMMddHHmmsss"), resUserFromHIS.userName, "User", resUserFromHIS.DisplayName);
                    var obj_token = tokenHandler.CreateToken(tokenDescriptor);
                    token = new JwtSecurityTokenHandler().WriteToken(obj_token);
                    User = new responseUserModel
                    {
                        UID = DateTime.Now.ToString("yyyyMMddHHmmsss"),
                        UserName = resUserFromHIS.userName,
                        FullName = resUserFromHIS.DisplayName,
                        Department = "",
                        LocationId = 0,
                        LocationCode ="",
                        LocationName = "",
                        PermissionID = "PR10002",
                        PermissionName = "User",
                        MachineNumber = machineMaster.MachineLocationcode,
                        MachineLocationName = machineMaster.MachineLocationname,
                    };
                    MUser mUser = new MUser()
                    {
                        UserId = DateTime.Now.ToString("yyyyMMddHHmmsss"),
                        UserFullname = resUserFromHIS.DisplayName,
                        UserDepartment = "",
                        PerId = "PR10002",
                        PerAssignment = "",
                        UserUsercreate = "",
                        UserCreatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                        UserCreatetime = DateTime.Now.ToString("HH:mm"),
                        UserUpdatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                        UserUpdatetime = DateTime.Now.ToString("HH:mm"),
                        UserStatus = "1"
                    };

                    MUserLogin mUserLogin = new MUserLogin()
                    {
                        UloginId = DateTime.Now.ToString("yyyyMMddHHmmsss"),
                        UserId = DateTime.Now.ToString("yyyyMMddHHmmsss"),
                        UloginUsername = resUserFromHIS.userName,
                        UloginPassward = resUserFromHIS.userName,
                        UloginUsercreate = "",
                        UloginCreatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                        UloginCreatetime = DateTime.Now.ToString("HH:mm"),
                        UloginStatus = "1",
                        UloginUpdatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                        UloginUpdatetime = DateTime.Now.ToString("HH:mm")
                    };

                    var resAddMUser = await _usersRepository.AddMUsersAsync(mUser);
                    if (resAddMUser)
                    {
                        var resAddMUserLogin = await _usersRepository.AddMUsersLoginAsync(mUserLogin);
                    }


                }
                else
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, new SendResponseModel(401, "Unauthorized", null));
                }       
            }
                   
            responseLoginModel responseLogin = new responseLoginModel()
            {
                username = User.UserName,
                token = token,//"Bearer " + token,
                Exp = tokenDescriptor.Expires,
                User = User
            };
           
            return Ok(new SendResponseModel(200,"OK", responseLogin));
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] registerModel register)
        {
            var checkUsername = await _usersRepository.GetByUsernameAsync(register.username);
            if (checkUsername == null)
            {
                MUser mUser = new MUser() {
                    UserId = DateTime.Now.ToString("yyyyMMddHHmmsss"),
                    UserFullname = register.userFullname,
                    UserDepartment = register.userDepartment,
                    PerId = register.perId, 
                    PerAssignment = register.perAssignment, 
                    UserUsercreate = register.userCreate,
                    UserCreatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                    UserCreatetime = DateTime.Now.ToString("HH:mm"),
                    UserUpdatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                    UserUpdatetime = DateTime.Now.ToString("HH:mm"),
                    UserStatus = "1"
                };

                MUserLogin mUserLogin = new MUserLogin()
                {
                    UloginId = DateTime.Now.ToString("yyyyMMddHHmmsss"),
                    UserId = DateTime.Now.ToString("yyyyMMddHHmmsss"),
                    UloginUsername = register.username,
                    UloginPassward = register.password,
                    UloginUsercreate = register.userCreate,
                    UloginCreatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                    UloginCreatetime = DateTime.Now.ToString("HH:mm"),
                    UloginStatus = "1",
                    UloginUpdatedate = DateTime.Now.ToString("yyyy-MM-dd"),
                    UloginUpdatetime = DateTime.Now.ToString("HH:mm")
                };

                var resAddMUser = await _usersRepository.AddMUsersAsync(mUser);
                if (resAddMUser)
                {
                    var resAddMUserLogin = await _usersRepository.AddMUsersLoginAsync(mUserLogin);
                    if (resAddMUserLogin)
                    {
                        return Ok(new SendResponseModel(200,"OK","Regis Success"));
                    }
                    else
                    {
                        return  StatusCode(StatusCodes.Status401Unauthorized, new SendResponseModel(401, "Unauthorized", null));
                    }
                }
                else
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, new SendResponseModel(401, "Unauthorized", null));
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, "Username is already exists", null));//Ok(new { status = "ERROR", msg = "Username is already exists" });
            }  
        }

        [Authorize]
        [HttpGet("Authen")]
         public IActionResult ChkAuthen(){
            Request.Headers.TryGetValue("Authorization", out var headerValue); 
            var token = headerValue.ToString();
            var username = _IauthenRepository.DecodeJWT(token);
            return Ok(new SendResponseModel(200,"OK",username));
         }
    }

    

}
