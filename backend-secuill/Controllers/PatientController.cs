using backend_secuill.Interface;
using backend_secuill.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]
    public class PatientController : Controller
    {

        private readonly ILogger<PatientController> _logger;
        private readonly IPatientRepository _IPatient;
        public PatientController(ILogger<PatientController> logger,IPatientRepository IPatientRepository) { 
            _logger = logger;
            _IPatient = IPatientRepository;
        }

        [Authorize]
        [HttpGet("getPatient")]
        public async Task<IActionResult> getPatient()
        {
            var res = _IPatient.ReponsePatientModels().Result;
            return Ok(new SendResponseModel(200,"OK", res));
        }

        [Authorize]
        [HttpGet("getPatientUsage")]
        public async Task<IActionResult> getPatientUsage([FromQuery] string hn)
        {
            var res = _IPatient.ResponsePatientUsageModels(hn).Result;
            return Ok(new SendResponseModel(200, "OK", res));
        }
    }
}
