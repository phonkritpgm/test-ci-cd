namespace backend_secuill.Models.DashBoard
{
    public class refillHour
    {
        public string hour { get; set; }
    }
    public class responseHeaderHistoryRefillModel
    {
        public string refillDate { get; set; }
        
        public List<refillHour> refillHours { get; set; }   
    }
}
