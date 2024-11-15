using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_User")]
[Index("UserId", Name = "IX_user_id")]
public partial class MUser
{
    [Key]
    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string UserId { get; set; } = null!;

    [Column("user_fullname")]
    [StringLength(150)]
    [Unicode(false)]
    public string? UserFullname { get; set; }

    [Column("user_department")]
    [StringLength(50)]
    [Unicode(false)]
    public string? UserDepartment { get; set; }

    [Column("user_location_id")]
    public byte? UserLocationId { get; set; }

    [Column("user_location_code")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserLocationCode { get; set; }

    [Column("user_location_name")]
    [StringLength(150)]
    [Unicode(false)]
    public string? UserLocationName { get; set; }

    [Column("user_imagpath")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserImagpath { get; set; }

    [Column("user_imgbinary", TypeName = "image")]
    public byte[]? UserImgbinary { get; set; }

    [Column("user_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? UserStatus { get; set; }

    [Column("per_id")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PerId { get; set; }

    [Column("per_assignment")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PerAssignment { get; set; }

    [Column("user_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserUsercreate { get; set; }

    [Column("user_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UserCreatedate { get; set; }

    [Column("user_createtime")]
    [StringLength(10)]
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
    [StringLength(10)]
    [Unicode(false)]
    public string? UserUpdatetime { get; set; }
}
