using Azure.Core;
using backend_secuill.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using backend_secuill.Models.Drugs;
using backend_secuill.Interface;
using backend_secuill.Repositories;
using backend_secuill.ResponseModel;


namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]
  
    public class DrugsController : ControllerBase
    {
        private readonly ILogger<DrugsController> _logger;
        private readonly IDrugsRepository _IDrugsRepository;
        private readonly IAuthenRepository _IAuthenRepository; 
        public DrugsController(ILogger<DrugsController> logger, IDrugsRepository idrugsRepository , IAuthenRepository authenRepository)
        {
            _logger = logger;
            _IDrugsRepository = idrugsRepository;
            _IAuthenRepository = authenRepository;  
        }

        //[Authorize(Roles = "Admin")]
        [Authorize]
        [HttpGet("GetDrugAll")]
        public async Task<IActionResult> GetDrugAll()
        {
            var result = _IDrugsRepository.getDrugMaster().Result;
            return Ok(new SendResponseModel(200, "OK", result));
        }

        [Authorize]
        [HttpPost("InsertDrug")]
        public async Task<IActionResult> InsertDrug([FromBody] bodyDrugInsertModel bodyDrugInsertModel)
        {
                    
                Request.Headers.TryGetValue("Authorization", out var headerValue);
                var token = headerValue.ToString();
                var userID = _IAuthenRepository.DecodeJWT(token).First(x => x.Type == "primarysid").Value;
                string result = await _IDrugsRepository.insertDrug(bodyDrugInsertModel, userID);
                if (result == "SUCCESS")
                {
                    return StatusCode(StatusCodes.Status200OK, new SendResponseModel(200, "Insert Success", null));
                }
                else
                {
                    return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, result, null));
                }    
            
        }

        [Authorize]
        [HttpPatch("UpdateDrugDetail")]
        public async Task<IActionResult> UpdateDrug([FromQuery] string drug_code , [FromBody] bodyDrugEditModel _bodyDrugModel )
        {                  
                    string result = await _IDrugsRepository.UpdateDrug(drug_code, _bodyDrugModel);
                    switch (result)
                    {
                        case "SUCCESS":
                            return StatusCode(StatusCodes.Status200OK, new SendResponseModel(200,"Update Success",null));
                            break;
                        case "NOTFOUND":
                            return StatusCode(StatusCodes.Status404NotFound);
                            break;
                        default:
                            return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, result, null));
                            break;
                    }  
        }

        [Authorize]
        [HttpGet("GetDrugLot")]
        public async Task<IActionResult> getDrugLot()
        {
            return Ok(new SendResponseModel(200, "OK", _IDrugsRepository.ResponseDrugLotModels().Result));
        }

        [Authorize]
        [HttpGet("GetConvertDrugUnitByDrugCode")]
        public async Task<IActionResult> GetConvertDrugUnitByDrugCode([FromQuery]string DrugCode)
        {
            return Ok(new SendResponseModel(200, "OK", _IDrugsRepository.ResponseConvertUnit(DrugCode).Result));
        }

        [Authorize]
        [HttpPost("InsertConvertDrugUnit")]
        public async Task<IActionResult> InsertConvertDrugUnit([FromBody] bodyInsertConvertDrugUnit bodyInsertConvertDrugUnit)
        {
            var result = await _IDrugsRepository.insertConvertDrugUnit(bodyInsertConvertDrugUnit);
            switch (result) {
                case "SUCCESS":
                    return Ok(new SendResponseModel(200,"OK",null));
                    break;
                   default:
                    return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, result, null));
                    break;
            }
        }

        [Authorize]
        [HttpPost("UpdateConvertDrugUnit")]
        public async Task<IActionResult> UpdateConvertDrugUnit(string DrugCode,[FromBody] bodyUpdateConvertDrugUnit bodyUpdateConvertDrugUnit)
        {
            var result = await _IDrugsRepository.updateConvertDrugUnit(DrugCode, bodyUpdateConvertDrugUnit);
            switch (result)
            {
                case "SUCCESS":
                    return Ok(new SendResponseModel(200, "OK", null));
                    break;
                    default:
                    return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, result, null));
                    break;
            }
        }

        //[Authorize]
        //[HttpGet("GetHostName")]
        //public IActionResult GetHostName()
        //{
        //    string HostName = "";
        //    IPAddress remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;
        //    string ip = "";
        //    if (remoteIpAddress != null)
        //    {
        //        // If we got an IPV6 address, then we need to ask the network for the IPV4 address 
        //        // This usually only happens when the browser is on the same machine as the server.
        //        if (remoteIpAddress.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
        //        {
        //            remoteIpAddress = System.Net.Dns.GetHostEntry(remoteIpAddress).AddressList
        //                             .First(x => x.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork);
        //        }
        //        ip = remoteIpAddress.ToString();
        //    }
        //    IPHostEntry entry = Dns.GetHostEntry(ip);
        //    if (entry != null)
        //    {
        //        HostName = entry.HostName;
        //    }
        //    return Ok(new { Data = HostName });
        //}
    }
}
