using Microsoft.AspNetCore.Mvc;

namespace backend_secuill.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
