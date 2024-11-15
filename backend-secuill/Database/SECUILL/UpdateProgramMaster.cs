using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("UpdateProgramMaster")]
public partial class UpdateProgramMaster
{
    public int? ProgramKey { get; set; }

    [Column("ProgramID")]
    public int? ProgramId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? ProgramName { get; set; }
}
