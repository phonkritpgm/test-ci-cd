using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill.Database.SECUILL;

[Table("M_ConvertDrugUnit")]
public partial class MConvertDrugUnit
{
    [Key]
    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DrugCode { get; set; } = null!;

    [Column("unitqty", TypeName = "decimal(10, 4)")]
    public decimal? Unitqty { get; set; }

    [Column("unitcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? Unitcode { get; set; }

    [Column("convto", TypeName = "decimal(10, 4)")]
    public decimal? Convto { get; set; }

    [Column("convtounitcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? Convtounitcode { get; set; }
}
