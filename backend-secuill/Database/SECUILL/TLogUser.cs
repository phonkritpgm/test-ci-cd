using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_LogUser")]
public partial class TLogUser
{
    [Key]
    [Column("loguser_runningno")]
    [StringLength(20)]
    [Unicode(false)]
    public string LoguserRunningno { get; set; } = null!;

    [Column("machine_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MachineCode { get; set; }

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

    [Column("loguser_user")]
    [StringLength(20)]
    [Unicode(false)]
    public string? LoguserUser { get; set; }

    [Column("loguser_event")]
    [StringLength(150)]
    [Unicode(false)]
    public string? LoguserEvent { get; set; }

    [Column("loguser_level")]
    [StringLength(1)]
    [Unicode(false)]
    public string? LoguserLevel { get; set; }

    [Column("loguser_programmode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? LoguserProgrammode { get; set; }

    [Column("loguser_timestamp", TypeName = "datetime")]
    public DateTime? LoguserTimestamp { get; set; }
}
