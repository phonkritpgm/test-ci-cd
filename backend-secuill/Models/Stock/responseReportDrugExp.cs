namespace backend_secuill.Models.Stock
{
    public class responseReportDrugExp
    {
        public string drugcode { get; set; }
        public string drugname { get; set; }
        public string lot_no { get; set; }
        public DateTime? lot_exp_calc { get; set; }
        public int lot_qty { get; set; }
        public int lot_maxqty { get; set; }


    }
}
