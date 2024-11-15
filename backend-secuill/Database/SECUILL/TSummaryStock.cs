using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("StockRunid", "DrugCode")]
[Table("T_SummaryStock")]
public partial class TSummaryStock
{
    [Key]
    [Column("stock_runid")]
    [StringLength(20)]
    [Unicode(false)]
    public string StockRunid { get; set; } = null!;

    [Key]
    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DrugCode { get; set; } = null!;

    [Column("stock_qty", TypeName = "decimal(4, 2)")]
    public decimal? StockQty { get; set; }

    [Column("stock_lastprocess")]
    [StringLength(200)]
    [Unicode(false)]
    public string? StockLastprocess { get; set; }

    [Column("stock_min", TypeName = "decimal(4, 2)")]
    public decimal? StockMin { get; set; }

    [Column("stock_max", TypeName = "decimal(4, 2)")]
    public decimal? StockMax { get; set; }

    [Column("stock_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? StockDate { get; set; }

    [Column("stock_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? StockTime { get; set; }
}
