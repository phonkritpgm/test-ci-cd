namespace backend_secuill.Models.Stock
{
    public class responseReportRefillModel
    {
        public int no {  get; set; }
        public string drugCode { get; set; }
        public string drugName { get; set; }
        public int min { get; set; }
        public int max { get; set; }
        public int qty { get; set; }
        public int diff { get; set; }
        public string lotExp { get; set; }
        public string note { get; set; }
    }
}
