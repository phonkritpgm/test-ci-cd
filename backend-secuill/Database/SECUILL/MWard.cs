using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Ward")]
public partial class MWard
{
    [Key]
    [Column("ward_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string WardCode { get; set; } = null!;

    [Column("ward_seq", TypeName = "numeric(2, 0)")]
    public decimal WardSeq { get; set; }

    [Column("ward_name")]
    [StringLength(100)]
    [Unicode(false)]
    public string? WardName { get; set; }

    [Column("ward_location")]
    [StringLength(50)]
    [Unicode(false)]
    public string? WardLocation { get; set; }

    [Column("ward_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? WardStatus { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }

    [Column("ward_fdstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? WardFdstatus { get; set; }

    [Column("ward_briefname")]
    [StringLength(50)]
    [Unicode(false)]
    public string? WardBriefname { get; set; }
}
