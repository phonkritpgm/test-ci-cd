namespace backend_secuill.Models.Middle
{
    public class responseDrugStockAndCountDrugInPrescription
    {
        public string drugCode { get; set; }
        public string drugName { get; set; }
        public decimal? stockDrugMachine { get; set; }
        public decimal? sumaryDrugInPrescription { get; set; }

        public List<string> prescriptionDrugLists { get; set; }
    }
}
