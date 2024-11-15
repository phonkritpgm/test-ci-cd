namespace backend_secuill.Models.DashBoard
{
    public class QtyPerHour
    {
        public int qty { get; set; }

        public string hour { get; set; }
    }
    public class responseQtyPerHourModel
    {
        public string drug_code { get; set; }

        public string drug_name { get; set; }
        public List<QtyPerHour> QtyPerHour { get; set; }
    }

}
