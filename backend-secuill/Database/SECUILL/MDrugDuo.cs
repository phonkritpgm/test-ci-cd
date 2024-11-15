using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("DrugCode", "DuoDrugCode")]
[Table("M_DrugDuo")]
public partial class MDrugDuo
{
    [Key]
    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DrugCode { get; set; } = null!;

    [Key]
    [Column("duo_drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DuoDrugCode { get; set; } = null!;

    [Column("duo_qty", TypeName = "decimal(4, 2)")]
    public decimal DuoQty { get; set; }

    [Column("duo_desc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? DuoDesc { get; set; }

    [Column("duo_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? DuoStatus { get; set; }

    [Column("duo_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? DuoDate { get; set; }

    [Column("duo_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? DuoTime { get; set; }
}
