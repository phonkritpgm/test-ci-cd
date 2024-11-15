using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_CaseUseDrug")]
public partial class MCaseUseDrug
{
    [Key]
    [Column("case_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string CaseCode { get; set; } = null!;

    [Column("case_name")]
    [StringLength(30)]
    [Unicode(false)]
    public string? CaseName { get; set; }

    [Column("case_desc")]
    [StringLength(30)]
    [Unicode(false)]
    public string? CaseDesc { get; set; }

    [Column("case_userset")]
    [StringLength(20)]
    [Unicode(false)]
    public string? CaseUserset { get; set; }

    [Column("case_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? CaseStatus { get; set; }

    [Column("case_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? CaseUserupdate { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
