namespace backend_secuill.Models.Stock
{
    public class responseLotNumber
    {
        public string lotno { get; set; }
        public string drugcode { get; set; }
        public string drugname { get; set; }
        public int lotqty {  get; set; }
        public int lotmaxqty { get; set; }
        public DateTime? lotbbe { get; set; }
        public DateTime? lotexp { get; set; }
        public string lotstatus { get; set; }
    }
}
