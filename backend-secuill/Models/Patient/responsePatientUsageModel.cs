namespace backend_secuill.Models.Patient
{
    public class responsePatientUsageModel
    {
        public string? type { get; set; }
        public string? pres_dispensedstatus {  get; set; } 
        public string? pres_date { get; set; }
        public string pres_no { get; set; }
        public string? drug_name { get; set; }
        public decimal?   pres_orderqty { get; set; }
        public string? pres_noteprocessing { get; set; }
        public decimal? pick_orderqty { get; set; }
        public DateTime? pres_finishtime { get; set; }
    }
}
