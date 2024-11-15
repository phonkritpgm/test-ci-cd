using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_UserLogin")]
[Index("UserId", Name = "IX_user_id")]
public partial class  MUserLogin
{
    [Key]
    [Column("ulogin_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string UloginId { get; set; } = null!;

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string UserId { get; set; } = null!;

    [Column("ulogin_username")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UloginUsername { get; set; }

    [Column("ulogin_passward")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UloginPassward { get; set; }

    [Column("ulogin_barcode")]
    [StringLength(50)]
    [Unicode(false)]
    public string? UloginBarcode { get; set; }

    [Column("ulogin_fingerbinary")]
    public string? UloginFingerbinary { get; set; }

    [Column("ulogin_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? UloginStatus { get; set; }

    [Column("ulogin_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UloginUsercreate { get; set; }

    [Column("ulogin_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UloginCreatedate { get; set; }

    [Column("ulogin_createtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? UloginCreatetime { get; set; }

    [Column("ulogin_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UloginUserupdate { get; set; }

    [Column("ulogin_updatedate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UloginUpdatedate { get; set; }

    [Column("ulogin_updatetime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? UloginUpdatetime { get; set; }
}
