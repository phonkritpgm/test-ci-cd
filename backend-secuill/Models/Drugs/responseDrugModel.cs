namespace backend_secuill.Models.Drugs
{
    public class responseDrugModel
    {
        public string drug_code { set; get; }
        public string drug_name_en { set; get; }
        public string drug_name_th { set; get; }
        public string drug_barcode { set; get; }
        public int stock_qty { set; get; }
        public string drug_unit { set; get; }
        public int stock_min { set; get; }
        public int stock_max { set; get; }
        public string drug_narcotic { set; get; }
        public string drug_antibiotic { set; get; }
        public string drug_highalert { set; get; }
        public string drug_status { set; get; }
        public bool useConverUnit { set; get; }
        public decimal? unitqty { set; get; }
        public string unitcode { set; get; }
        public decimal? convto { set; get; }
        public string convtounitcode { set; get; }

    }
}
