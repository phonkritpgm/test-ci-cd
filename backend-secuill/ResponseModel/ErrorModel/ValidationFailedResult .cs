using backend_secuill.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend_secuill.ResponseModel.ErrorModel
{
    public class ValidationFailedResult : ObjectResult
    {
        public ValidationFailedResult(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary modelState)
         : base(new ValidationResultModel(modelState))
        {
            StatusCode = StatusCodes.Status422UnprocessableEntity; //change the http status code to 422.  
        }
    }
}
