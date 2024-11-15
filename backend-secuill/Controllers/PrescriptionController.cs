using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.DashBoard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Net.WebSockets;
using backend_secuill.ResponseModel;
using backend_secuill.Models.Prescription;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]
    public class PrescriptionController : Controller
    {
        private readonly ILogger<PrescriptionController> _logger;
        private readonly SecuillV5TuContext _dbContext;
        private readonly IPrescriptionRepository _IPrescription;
        public PrescriptionController(ILogger<PrescriptionController> logger, 
            SecuillV5TuContext dbcontext , 
            IPrescriptionRepository Iprescription)
        {
            _logger = logger;
            _dbContext = dbcontext;
            _IPrescription = Iprescription;
        }

        [Authorize]
        [HttpGet("GetCountDashBoard")]
        public async Task<IActionResult> GetCountDashBoard([FromQuery]string PresDate)
        {

            string date = PresDate.Replace("-","");
            int countPres = await _IPrescription.GetCountPrescritpion(date);
            int countPickPres = await _IPrescription.GetCountPickByPrescription(date);
            int countPickFree = await _IPrescription.GetCountFreeDispense(date);
            int countPresCancel = await _IPrescription.GetCountCancel(date);
            List<responseCountDashboardModel> responseCount = new List<responseCountDashboardModel>()
            {
                new responseCountDashboardModel(){CountPres = countPres,
                    countPickFree=countPickFree,
                    CountPickPres=countPickPres,
                    countPresCancel=countPresCancel}
            };

            return Ok(new SendResponseModel(200,"OK", responseCount ));
        }

        [Authorize]
        [HttpGet("GetValueChartLine")]
        public async Task<IActionResult> getValueChartBar([FromQuery] string PresDate)
        {
            string date =  PresDate.Replace("-","");
            return Ok(new SendResponseModel(200,"OK", _IPrescription.GetValueChartLine(date).Result));
        }

        [Authorize]
        [HttpPatch("UpdateStatusPrescription")]
        public async Task<IActionResult> UpdateStatusPrescription([FromQuery] int runningno,updateStatusPresModel updateStatusPresModel)
        {
            var res =await _IPrescription.updateStatusPres(runningno, updateStatusPresModel);
            if (res == "SUCCESS")
            {
                return Ok(new SendResponseModel(200, "OK", ""));
            }
            else
            {
                return StatusCode(StatusCodes.Status202Accepted,new SendResponseModel(202, res, ""));
            }
        }
    }
}

