using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("DrugCode", "SwDrugCode")]
[Table("M_DrugSwitch")]
public partial class MDrugSwitch
{
    [Key]
    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DrugCode { get; set; } = null!;

    [Key]
    [Column("sw_drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string SwDrugCode { get; set; } = null!;

    [Column("sw_qty", TypeName = "decimal(4, 2)")]
    public decimal? SwQty { get; set; }

    [Column("sw_priority", TypeName = "numeric(2, 0)")]
    public decimal? SwPriority { get; set; }

    [Column("sw_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? SwStatus { get; set; }

    [Column("sw_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? SwDate { get; set; }

    [Column("sw_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? SwTime { get; set; }
}
