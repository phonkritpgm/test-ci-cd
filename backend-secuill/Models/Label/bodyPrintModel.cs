namespace backend_secuill.Models.Label
{
    public class bodyPrintModel
    {
        public string DrugCode { get; set; }    
        public string DrugName { get; set; }
        public int RefillQty { get; set; }
        public string DrugUnit {  get; set; }
        public string Barcode { get; set; }
    }

    public class bodyArrayPrint
    {
        public List<bodyPrintModel> Print {  get; set; }
    }
}
