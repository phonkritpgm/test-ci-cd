using backend_secuill.ResponseModel.ErrorModel;
using backend_secuill.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend_secuill.ResponseModel.ErrorModel
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new ValidationFailedResult(context.ModelState);
            }
        }
    }
}
