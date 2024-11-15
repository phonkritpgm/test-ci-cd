using Azure;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.Middle;
using backend_secuill.Repositories;
using backend_secuill.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]
    
    public class MiddleController : Controller
    {
        private readonly ILogger<MiddleController> _logger;
        private readonly ConhisMiddleV4UbchContext _dbContext;
        private readonly IMiddleRepository _IMiddle;
        private readonly IAuthenRepository _IauthenRepository;
        public MiddleController(ILogger<MiddleController> logger, ConhisMiddleV4UbchContext dbContext , IMiddleRepository IMiddle, IAuthenRepository authenRepository)
        {   
            _logger = logger;
            _dbContext = dbContext;
            _IMiddle = IMiddle;
            _IauthenRepository = authenRepository;
        }

        [Authorize]
        [HttpGet("getPrescriptionToVerify")]
        public async Task<IActionResult> PrescriptionToVerify(string PresDate)
        {
            string date = PresDate.Replace("-","");
            var res = _IMiddle.getPrescriptionToVerify(date).Result;
            return  Ok(new SendResponseModel(200,"OK",res));    
        }

        [Authorize]
        [HttpPatch("updateStatusVerify/{RowID}")]
        public async Task<IActionResult> UpdateStatusVerify([FromRoute(Name = "RowID")] string rowid ,[FromBody] PatchStatusVerifyModel patchStatusVerifyModel)
        {
            Request.Headers.TryGetValue("Authorization", out var headerValue);
            var token = headerValue.ToString();
            var username = _IauthenRepository.DecodeJWT(token);
            var FullName = username.First(x => x.Type == "FullName").Value;
            var res = await _IMiddle.updateStatusVerify(rowid, patchStatusVerifyModel.f_tomachineno, FullName);
            switch (res)
            {
                case "SUCCESS":
                    return StatusCode(StatusCodes.Status200OK, new SendResponseModel(200,"Update Success",null));
                    break;
                case "NOTFOUND":
                    return StatusCode(StatusCodes.Status406NotAcceptable, new SendResponseModel(406, "ไม่สามารถเปลี่ยนแปลงสถานะได้", null));
                    break;
                default:
                    return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, res, null));
                    break;

            }
        }

        [Authorize]
        [HttpGet("checkDrugToVerify/{drugcode}")]
        public async Task<IActionResult> checkStockDrugAndDrugInPrescriptionMachine([FromRoute(Name = "drugcode")] string drugcode)
        {
            Request.Headers.TryGetValue("Authorization", out var headerValue);
            var token = headerValue.ToString();
            var username = _IauthenRepository.DecodeJWT(token);
            var FullName = username.First(x => x.Type == "FullName").Value;

            var result = _IMiddle.checkStockDrugAndDrugInPrescriptionMachine(drugcode).Result;
            return Ok(new SendResponseModel(200, "OK", result));
        }
    }
}
