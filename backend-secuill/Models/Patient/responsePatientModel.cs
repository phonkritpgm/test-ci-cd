namespace backend_secuill.Models.Patient
{
    public class responsePatientModel
    {
        public string  pat_hn { set; get; }
        public string  pat_an { set; get; }
        public string  pat_name { set; get; }
        public DateTime?  pat_dischargeddate { set; get; }
        public string  pat_wardcode { set; get; }
        public string  ward_name { set; get; }
        public int countVer   { set; get; }
        public int countFree  { set; get; }
    }
}
