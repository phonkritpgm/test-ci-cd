using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_DoubleLogin")]
[Index("ProcNo", Name = "IX_proc_no")]
public partial class TDoubleLogin
{
    [Key]
    [Column("conf_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string ConfId { get; set; } = null!;

    [Column("proc_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string? ProcNo { get; set; }

    [Column("user_id1")]
    [StringLength(20)]
    [Unicode(false)]
    public string UserId1 { get; set; } = null!;

    [Column("user_id2")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId2 { get; set; }

    [Column("conf_event")]
    [StringLength(100)]
    [Unicode(false)]
    public string? ConfEvent { get; set; }

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

    [Column("conf_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ConfDate { get; set; }

    [Column("conf_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? ConfTime { get; set; }
}
