using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_UserLoginLog")]
public partial class TUserLoginLog
{
    [Key]
    [Column("login_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string LoginId { get; set; } = null!;

    [Column("userlogin_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string UserloginId { get; set; } = null!;

    [Column("machine_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MachineCode { get; set; }

    [Column("modular_code")]
    [StringLength(20)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

    [Column("login_mode")]
    [StringLength(100)]
    [Unicode(false)]
    public string? LoginMode { get; set; }

    [Column("login_logindate", TypeName = "datetime")]
    public DateTime? LoginLogindate { get; set; }

    [Column("login_logoutdate", TypeName = "datetime")]
    public DateTime? LoginLogoutdate { get; set; }

    [Column("login_timestamp", TypeName = "datetime")]
    public DateTime? LoginTimestamp { get; set; }
}
