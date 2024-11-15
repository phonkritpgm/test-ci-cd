using System.ComponentModel.DataAnnotations;

namespace backend_secuill.Models.Drugs
{
    public class bodyDrugEditModel
    {
        [StringLength(50)]
        [Required(ErrorMessage = "กรุณาระบุชื่อยา")]
        public string drug_name_en {  get; set; }

        [StringLength(50)]
        public string? drug_name_th { get; set;}

        [StringLength(15)]
        public string? drug_barcode { get; set;}

        [StringLength(10)]
        public string? drug_unit {  get; set; }  
        public int stock_min { get; set; }
        public int stock_max { get; set; }

        [StringLength(1)]
        public string drug_narcotic { get; set; }
        [StringLength(1)]
        public string drug_antibiotic { get; set; }
        [StringLength(1)]
        public string drug_highalert { get; set; }
        [StringLength(1)]
        public string drug_status { get; set; }
        public bool useConverUnit { get; set; }
        public decimal? Unitqty { get; set; }
        public string? Unitcode { get; set; }
        public decimal? Convto { get; set; }
        public string? Convtounitcode { get; set; }
    }
}
