using System.Net;
using backend_secuill.Interface;
using backend_secuill.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend_secuill.ResponseModel;
using backend_secuill.Models.Stock;
using backend_secuill.Repositories;

namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ILogger<StockController> _logger;
        private readonly SecuillV5TuContext _dbContext;
        private readonly IStockRepository _IStock;
        private readonly IAuthenRepository _IauthenRepository;

        public StockController(ILogger<StockController> logger, SecuillV5TuContext dbContext, IStockRepository Istock, IAuthenRepository IauthenRepository)
        {
            _logger = logger;
            _dbContext = dbContext;
            _IStock = Istock;
            _IauthenRepository = IauthenRepository;

        }

        [Authorize]
        [HttpGet("GetHeaderRefill")]
        public async Task<IActionResult> GetHeaderRefill([FromQuery] string startDate)
        {
            return Ok(new SendResponseModel(200, "OK", _IStock.GetHeaderRefill(startDate).Result));
        }

        [Authorize]
        [HttpGet("GetDrugRefillDetailOverview")]
        public async Task<IActionResult> GetDrugRefillDetailOverview([FromQuery] string startDate, [FromQuery] string endDate)
        {
            return Ok(new SendResponseModel(200, "OK", _IStock.GetDrugRefill(startDate, endDate).Result));
        }

        [Authorize]
        [HttpGet("GetDrugRefill")]
        public async Task<IActionResult> GetHistoryRefill([FromQuery] string startDate, [FromQuery] string endDate) {
            return Ok(new SendResponseModel(200, "OK", _IStock.ResposeRefillModel(startDate, endDate).Result));
        }

        [Authorize]
        [HttpGet("GetStock")]
        public async Task<IActionResult> GetStock() {
            return Ok(new SendResponseModel(200, "OK", _IStock.ResponseStock().Result));
        }

        [Authorize]
        [HttpGet("GetReportDrugRefill")]
        public async Task<IActionResult> GetReportDrugRefill()
        {
            return Ok(new SendResponseModel(200, "OK", _IStock.ResponseDrugRefillReport().Result));
        }

        [Authorize]
        [HttpGet("GetReportDrugExp")]
        public async Task<IActionResult> GetReportDrugExp()
        {
            return Ok(new SendResponseModel(200, "OK", _IStock.ResposneReportDrugExp().Result));
        }

        [Authorize]
        [HttpGet("GetLotNumberByDrugCode")]
        public async Task<IActionResult> GetLotNumber([FromQuery] string drugName)
        {
            return Ok(new SendResponseModel(200, "OK", _IStock.ResponseLotNumbers(drugName).Result));
        }

        [Authorize]
        [HttpPost("InsertLotNumber")]
        public async Task<IActionResult> InsertLotNumber([FromBody] bodyInsertLotNumber bodyInsertLotNumber)
        {
            Request.Headers.TryGetValue("Authorization", out var headerValue);
            var token = headerValue.ToString();
            var username = _IauthenRepository.DecodeJWT(token);
            var UserID = username.First(x => x.Type == "primarysid").Value;
            string res =await _IStock.insertLotNumber(bodyInsertLotNumber, UserID);
            if (res == "SUCCESS")
            {
                return Ok(new SendResponseModel(200, "OK", null));
            }
            else
            {
                return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, res , null));
            }
        }

        [Authorize]
        [HttpPatch("UpdateLotNumber")]
        public async Task<IActionResult> UpdateLotNumber([FromBody] bodyUpdateLotNumber bodyUpdateLotNumber, [FromQuery] string drugCode, [FromQuery] string LotNo )
        {
            Request.Headers.TryGetValue("Authorization", out var headerValue);
            var token = headerValue.ToString();
            var username = _IauthenRepository.DecodeJWT(token);
            var UserID = username.First(x => x.Type == "primarysid").Value;
            string res = await _IStock.updateLotNumber(bodyUpdateLotNumber, drugCode, LotNo, UserID);
            if (res == "SUCCESS")
            {
                return Ok(new SendResponseModel(200, "OK", null));
            }
            else
            {
                return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, res, null));
            }
        }

        [Authorize]
        [HttpPatch("UpdateStatusLotNumber")]
        public async Task<IActionResult> UpdateStatusLotNumber([FromBody] bodyUpdateStatusLotModel bodyStatusLotNumber, [FromQuery] string drugCode, [FromQuery] string LotNo)
        {
            Request.Headers.TryGetValue("Authorization", out var headerValue);
            var token = headerValue.ToString();
            var username = _IauthenRepository.DecodeJWT(token);
            var UserID = username.First(x => x.Type == "primarysid").Value;
            string res = await _IStock.updateStatusLotNumber(bodyStatusLotNumber, drugCode, LotNo, UserID);
            if (res == "SUCCESS")
            {
                return Ok(new SendResponseModel(200, "OK", null));
            }
            else
            {
                return StatusCode(StatusCodes.Status202Accepted, new SendResponseModel(202, res, null));
            }
        }
    }
}
