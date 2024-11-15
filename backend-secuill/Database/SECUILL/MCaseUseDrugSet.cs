using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("CasesetId", "CaseCode", "CasesetDrugcode")]
[Table("M_CaseUseDrugSet")]
public partial class MCaseUseDrugSet
{
    [Key]
    [Column("caseset_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string CasesetId { get; set; } = null!;

    [Key]
    [Column("case_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string CaseCode { get; set; } = null!;

    [Key]
    [Column("caseset_drugcode")]
    [StringLength(15)]
    [Unicode(false)]
    public string CasesetDrugcode { get; set; } = null!;

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
