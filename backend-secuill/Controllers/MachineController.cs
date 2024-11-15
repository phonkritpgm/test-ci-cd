using backend_secuill.Controllers;
using backend_secuill.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_secuill.Interface
{
    [Route("api")]
    [ApiController]
    
    public class MachineController : Controller
    {
        private readonly ILogger<MachineController> _logger;
        private readonly IMachineRepository _machineRepository;
        public MachineController(ILogger<MachineController> logger,IMachineRepository machineRepository) {
            _logger = logger;
            this._machineRepository = machineRepository; 
        }

        [Authorize]
        [HttpGet("GetMachineUnit")]
        public async Task<IActionResult> MachineUnit()
        {
            return Ok(new SendResponseModel(200, "OK", _machineRepository.getMachineUnit().Result));
        }

        [Authorize]
        [HttpGet("GetMachineShelf")]
        public async Task<IActionResult> MachineShelf()
        {
            return Ok(new SendResponseModel(200, "OK", _machineRepository.getMachineShelf("").Result));
        }

        [Authorize]
        [HttpGet("GetMachineShelfByUnit")]
        public async Task<IActionResult> MachineShelfByUnit([FromQuery] string UnitNo)
        {
            return Ok(new SendResponseModel(200, "OK", _machineRepository.getMachineShelf(UnitNo).Result));
        }

        [Authorize]
        [HttpGet("GetDrugInSlot")]
        public async Task<IActionResult> DrugInSlot()
        {
            return Ok(new SendResponseModel(200, "OK", _machineRepository.getDrugInSlot("").Result));
        }

        [Authorize]
        [HttpGet("GetDrugInSlotByShelf")]
        public async Task<IActionResult> DrugInSlotByShelf(string ShelfNo)
        {
            return Ok(new SendResponseModel(200, "OK", _machineRepository.getDrugInSlot(ShelfNo).Result));
        }
    }
}
