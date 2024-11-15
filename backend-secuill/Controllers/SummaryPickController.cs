using System.Net;
using backend_secuill.Interface;
using backend_secuill.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend_secuill.ResponseModel;

namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]
    public class SummaryPickController : ControllerBase
    {
        private readonly ILogger<SummaryPickController> _logger;
        private readonly SecuillV5TuContext _dbContext;
        private readonly ISummaryPickRepository _ISummaryPick;
        public SummaryPickController(ILogger<SummaryPickController> logger, SecuillV5TuContext dbContext, ISummaryPickRepository IsummaryPick)
        {
            _logger = logger;
            _dbContext = dbContext;
            _ISummaryPick = IsummaryPick;
        }

        [Authorize]
        [HttpGet("GetValueQtyPerHour")]
        public async Task<IActionResult> getValueQtyPerHour([FromQuery] string PresDate)
        {
            if (!ModelState.IsValid){
                return UnprocessableEntity(ModelState); 
            }
            return Ok(new SendResponseModel(200, "OK", _ISummaryPick.GetQtyPerHour(PresDate).Result ));
        }

        [Authorize]
        [HttpGet("GetPickPrescription")]
        public async Task<IActionResult> getPickPres([FromQuery] string startDate , [FromQuery] string endDate){
            if (!ModelState.IsValid){
                return UnprocessableEntity(ModelState); 
            }
            return Ok(new SendResponseModel(200, "OK",  _ISummaryPick.resposePickPres(startDate,endDate).Result));
        }

        [Authorize]
        [HttpGet("GetPickFreeOrder")]
        public async Task<IActionResult> getPickFree([FromQuery] string startDate,[FromQuery] string endDate){
            if (!ModelState.IsValid){
                return UnprocessableEntity(ModelState); 
            }
            return Ok(new SendResponseModel(200, "OK", _ISummaryPick.getDatePickFreeOrder(startDate,endDate).Result));
        }

        [Authorize]
        [HttpGet("GetReportSummaryPick")]
        public async Task<IActionResult> GetReportSummaryPick([FromQuery] string  startDate, string endDate)
        {
            return Ok(new SendResponseModel(200, "OK", _ISummaryPick.ResponseReportSummaryPick(startDate, endDate).Result));
        }
    }
}
