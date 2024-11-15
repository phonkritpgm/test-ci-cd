namespace backend_secuill.ResponseModel
{
    public class SendResponseModel
    {

        public int StatusCode { get; set; }
        public string Message { get; set; }

        public object Payload { get; set; }

        public SendResponseModel(int StatusCode, string Message, object PayLoad)
        {
            this.StatusCode = StatusCode;
            this.Message = Message;
            this.Payload = PayLoad;
        }

    }
}
