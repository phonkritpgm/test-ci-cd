using backend_secuill.Interface;
using backend_secuill.Models.Label;
using backend_secuill.ResponseModel;
using Microsoft.AspNetCore.Mvc;
namespace backend_secuill.Controllers
{
    [Route("api")]
    [ApiController]

    public class PrintLabelController : Controller
    {
        private readonly ILogger<AuthenController> _logger;
        private readonly IPrintLabel _printLabel ;
        public PrintLabelController(ILogger<AuthenController> logger, IPrintLabel printLabel)
        {
            _logger = logger;
            _printLabel = printLabel;
        }

        [HttpPost("PrintLabel")]
        public async Task<IActionResult> PrintLabel(bodyArrayPrint bodyArrayPrint)
        {
            var result =await _printLabel.PrintLabelRefill(bodyArrayPrint);
          
            return Ok(new SendResponseModel(200, "OK", result));
        }

    }
}
