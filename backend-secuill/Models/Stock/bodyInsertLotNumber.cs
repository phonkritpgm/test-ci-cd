using System.ComponentModel.DataAnnotations;

namespace backend_secuill.Models.Stock
{
    public class bodyInsertLotNumber
    {
        [Required(ErrorMessage ="กรุณาระบุ Lot Number")]
        public string lotno { get; set; }

        [Required(ErrorMessage = "กรุณาระบุรหัสยา")]
        public string drugcode { get; set; }
        public int lotqty { get; set; }
        public int lotmaxqty { get; set; }
        public DateTime? lotbbe { get; set; }
        public DateTime lotexp { get; set; }
    }
}
