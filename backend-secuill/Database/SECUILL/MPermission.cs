using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Permissions")]
public partial class MPermission
{
    [Key]
    [Column("per_id")]
    [StringLength(10)]
    [Unicode(false)]
    public string PerId { get; set; } = null!;

    [Column("per_name")]
    [StringLength(30)]
    [Unicode(false)]
    public string PerName { get; set; } = null!;

    [Column("per_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PerStatus { get; set; }

    [Column("user_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserUsercreate { get; set; }

    [Column("user_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UserCreatedate { get; set; }

    [Column("user_createtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? UserCreatetime { get; set; }

    [Column("user_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserUserupdate { get; set; }

    [Column("user_updatedate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UserUpdatedate { get; set; }

    [Column("user_updatetime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? UserUpdatetime { get; set; }
}
