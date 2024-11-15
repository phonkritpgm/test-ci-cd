using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("T_StockBeforeAfter")]
public partial class TStockBeforeAfter
{
    public int StockBeforeAfterKey { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Mode { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? RefKey { get; set; }

    [Column("drug_code")]
    [StringLength(20)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("before_qty", TypeName = "decimal(6, 2)")]
    public decimal? BeforeQty { get; set; }

    [Column("after_qty", TypeName = "decimal(6, 2)")]
    public decimal? AfterQty { get; set; }

    [Column("stock_min", TypeName = "decimal(6, 2)")]
    public decimal? StockMin { get; set; }

    [Column("stock_max", TypeName = "decimal(6, 2)")]
    public decimal? StockMax { get; set; }

    [Column("stamp_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? StampDate { get; set; }

    [Column("stamp_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? StampTime { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
