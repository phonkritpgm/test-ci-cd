using Microsoft.AspNetCore.Mvc;

namespace backend_secuill.Controllers
{
    public class StaticFilesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
