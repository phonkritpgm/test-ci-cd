using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill.Database.SECUILL;

[Table("T_LogMachine")]
public partial class TLogMachine
{
    [Key]
    [Column("logmc_runningno")]
    [StringLength(20)]
    [Unicode(false)]
    public string LogmcRunningno { get; set; } = null!;

    [Column("logmc_machineno")]
    [StringLength(10)]
    [Unicode(false)]
    public string? LogmcMachineno { get; set; }

    [Column("logmc_mode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? LogmcMode { get; set; }

    [Column("logmc_event")]
    [StringLength(50)]
    [Unicode(false)]
    public string? LogmcEvent { get; set; }

    [Column("logmc_cmd")]
    [StringLength(5)]
    [Unicode(false)]
    public string? LogmcCmd { get; set; }

    [Column("logmc_data")]
    [StringLength(100)]
    [Unicode(false)]
    public string? LogmcData { get; set; }

    [Column("logmc_desc")]
    [StringLength(50)]
    [Unicode(false)]
    public string? LogmcDesc { get; set; }

    [Column("logmc_status")]
    [StringLength(10)]
    [Unicode(false)]
    public string? LogmcStatus { get; set; }

    [Column("logmc_sendstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? LogmcSendstatus { get; set; }

    [Column("logmc_recievestatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? LogmcRecievestatus { get; set; }

    [Column("logmc_timestamp", TypeName = "datetime")]
    public DateTime? LogmcTimestamp { get; set; }
}
