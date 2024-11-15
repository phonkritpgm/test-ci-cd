namespace backend_secuill.Models.Machine
{
    public class responseSlotModel
    {
        public string shelfNo { get; set; } 
        public string slotId { get; set; }
        public string slotName { get; set; }
        public string drugCode { get; set; }
        public string drugName { get; set; }
        public int qty { get; set; }
        public int maxQty { get; set; }
        public string slotStatus { get; set; }


    }
}
