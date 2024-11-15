using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("SumId", "RefillNo")]
[Table("T_SummaryDrugRefill")]
public partial class TSummaryDrugRefill
{
    [Key]
    [Column("sum_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string SumId { get; set; } = null!;

    [Key]
    [Column("refill_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string RefillNo { get; set; } = null!;

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("refill_qty", TypeName = "decimal(4, 2)")]
    public decimal? RefillQty { get; set; }

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId { get; set; }

    [Column("stock_old", TypeName = "decimal(4, 2)")]
    public decimal? StockOld { get; set; }

    [Column("stock_current", TypeName = "decimal(4, 2)")]
    public decimal? StockCurrent { get; set; }

    [Column("refill_counter", TypeName = "numeric(2, 0)")]
    public decimal? RefillCounter { get; set; }

    [Column("refill_drugidentify")]
    [StringLength(15)]
    [Unicode(false)]
    public string? RefillDrugidentify { get; set; }

    [Column("refill_case")]
    [StringLength(1)]
    [Unicode(false)]
    public string? RefillCase { get; set; }

    [Column("refill_noteprocess")]
    [StringLength(200)]
    [Unicode(false)]
    public string? RefillNoteprocess { get; set; }

    [Column("refill_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? RefillStatus { get; set; }

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

    [Column("lot_no")]
    [StringLength(30)]
    [Unicode(false)]
    public string? LotNo { get; set; }

    [Column("lot_qty", TypeName = "decimal(6, 2)")]
    public decimal? LotQty { get; set; }

    [Column("lot_maxqty", TypeName = "decimal(6, 2)")]
    public decimal? LotMaxqty { get; set; }

    [Column("lot_exp", TypeName = "datetime")]
    public DateTime? LotExp { get; set; }

    [Column("refill_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? RefillDate { get; set; }

    [Column("refill_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? RefillTime { get; set; }
}
