using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_QueryTime")]
public partial class TQueryTime
{
    [Key]
    public int QueryTimeKey { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string? ProgramName { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string? ClientName { get; set; }

    [Column("ClientIP")]
    [StringLength(15)]
    [Unicode(false)]
    public string? ClientIp { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? FunctionName { get; set; }

    [Unicode(false)]
    public string? Query { get; set; }

    [Column(TypeName = "decimal(12, 5)")]
    public decimal? ElapsedTime { get; set; }

    [Column("QueryDT", TypeName = "datetime")]
    public DateTime? QueryDt { get; set; }
}
