namespace backend_secuill.Models.PickDrug
{
    public class responseReportSummaryPickModel
    {
        public int no { get; set; } 
        public string drugcode { get; set; }    
        public string drugname { get; set; }
        public int varqty { get; set; }
        public int freeqty { get; set; }
        public int pickall   { get; set; }
        public string drugstatus { get; set; }
    }
}
