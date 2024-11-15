using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_DrugInterAction")]
public partial class MDrugInterAction
{
    [Key]
    [Column("interaction_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string InteractionNo { get; set; } = null!;

    [Column("drugcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? Drugcode { get; set; }

    [Column("interaction_desc")]
    [StringLength(300)]
    [Unicode(false)]
    public string? InteractionDesc { get; set; }

    [Column("drugcode_combine")]
    [StringLength(100)]
    [Unicode(false)]
    public string? DrugcodeCombine { get; set; }

    [Column("degree_desc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? DegreeDesc { get; set; }

    [Column("interaction_drugcd1")]
    [StringLength(20)]
    [Unicode(false)]
    public string? InteractionDrugcd1 { get; set; }

    [Column("interaction_drugcd2")]
    [StringLength(20)]
    [Unicode(false)]
    public string? InteractionDrugcd2 { get; set; }
}
