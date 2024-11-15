using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_ProgramTimestamp")]
public partial class TProgramTimestamp
{
    [Key]
    [Column("runningNo")]
    public int RunningNo { get; set; }

    [Column("programName")]
    [StringLength(30)]
    [Unicode(false)]
    public string? ProgramName { get; set; }

    [Column("location")]
    [StringLength(20)]
    [Unicode(false)]
    public string? Location { get; set; }

    [Column("version")]
    [StringLength(20)]
    [Unicode(false)]
    public string? Version { get; set; }

    [Column("ip")]
    [StringLength(20)]
    [Unicode(false)]
    public string? Ip { get; set; }

    [Column("clientName")]
    [StringLength(30)]
    [Unicode(false)]
    public string? ClientName { get; set; }

    [Column("timestamp", TypeName = "datetime")]
    public DateTime? Timestamp { get; set; }

    [Column("programStartDt", TypeName = "datetime")]
    public DateTime? ProgramStartDt { get; set; }

    [Column("programEndDt", TypeName = "datetime")]
    public DateTime? ProgramEndDt { get; set; }
}
