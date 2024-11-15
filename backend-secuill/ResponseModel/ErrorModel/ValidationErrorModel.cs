using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;


namespace backend_secuill.ResponseModel.ErrorModel
{
    public class ValidationError
    {
    
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Field { get; }


        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        //public int Code { get; set; }

        public string Message { get; }

        public ValidationError(string field, int code, string message)
        {
            Field = field != string.Empty ? field : null;
            //Code = code != 0 ? code : 55;  //set the default code to 55. you can remove it or change it to 400.  
            Message = message;
        }
    }
    public class ValidationResultModel
    {
        public String StatusCode { get; set; }

        public string Message { get; }

        public List<ValidationError> Payload { get; }

        public ValidationResultModel(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary modelState)
        {
            StatusCode = "422";
            Message = "Validation Failed";
            Payload = modelState.Keys
                    .SelectMany(key => modelState[key].Errors.Select(x => new ValidationError(key, 0, x.ErrorMessage)))
                    .ToList();
        }
    }
}
