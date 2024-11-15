using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("T_Report")]
public partial class TReport
{
    public int ReportKey { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string? ModeType { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string? RefKey { get; set; }

    [Unicode(false)]
    public string? Query { get; set; }

    [Column(TypeName = "image")]
    public byte[]? Img { get; set; }

    [Column(TypeName = "date")]
    public DateTime? ReportDate { get; set; }

    [Precision(5)]
    public TimeSpan? ReportTime { get; set; }
}
