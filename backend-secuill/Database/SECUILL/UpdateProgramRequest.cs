using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("UpdateProgramRequest")]
public partial class UpdateProgramRequest
{
    public int UpdateProgramRequestKey { get; set; }

    public int? UpdateProgramKey { get; set; }

    public int? ProgramKey { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? ClientNameRequest { get; set; }

    [Column("ClientIPRequest")]
    [StringLength(15)]
    [Unicode(false)]
    public string? ClientIprequest { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? ClientLastVersion { get; set; }

    [Column("ProcessDT", TypeName = "datetime")]
    public DateTime? ProcessDt { get; set; }

    public short? ProcessStatus { get; set; }

    [Unicode(false)]
    public string? ProcessNote { get; set; }
}
