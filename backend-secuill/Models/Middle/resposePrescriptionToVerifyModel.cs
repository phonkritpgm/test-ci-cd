namespace backend_secuill.Models.Middle
{
    public class resposePrescriptionToVerifyModel
    {
        public string  f_tomachineno {  get; set; } 
        public string f_prescriptionno { get; set; }
        public string f_prescriptiondate { get; set; }
        public string f_hn { get; set; }
        public string f_warddesc { get; set; }
        public string f_orderitemname { get; set; }
        public string f_orderitemcode { get; set; }
        public decimal f_orderqty { get; set; }
        public string? f_orderunitcode { get; set; }
        public string f_frequencydesc { get; set; }
        public DateTime? f_orderacceptdate { get; set; }
        public string f_patientname { get; set; }
        public int f_status { get; set; }
        public DateTime? f_offdate { get; set; }
        public string RowID { get; set; }
        public string pres_status { get; set; }
        public string pres_statusdesc  { get; set; }
        public string pres_dispensedstatus  { get; set; }
        public string pres_dispenseddesc { get; set; }
        public int pres_runningno { get; set; }


    }
}
