using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("tb_master_user")]
public partial class TbMasterUser
{
    [Key]
    [Column("f_userid")]
    [StringLength(32)]
    [Unicode(false)]
    public string FUserid { get; set; } = null!;

    [Column("f_userconfirmid")]
    [StringLength(32)]
    [Unicode(false)]
    public string? FUserconfirmid { get; set; }

    [Column("f_userpasscode")]
    [StringLength(4)]
    [Unicode(false)]
    public string? FUserpasscode { get; set; }

    [Column("f_userpasscodestatus", TypeName = "numeric(1, 0)")]
    public decimal? FUserpasscodestatus { get; set; }

    [Column("f_userfullname")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FUserfullname { get; set; }

    [Column("f_usermobile")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FUsermobile { get; set; }

    [Column("f_userdepartment")]
    [StringLength(50)]
    [Unicode(false)]
    public string? FUserdepartment { get; set; }

    [Column("f_userplace")]
    [StringLength(50)]
    [Unicode(false)]
    public string? FUserplace { get; set; }

    [Column("f_userquestion")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FUserquestion { get; set; }

    [Column("f_useranswer")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FUseranswer { get; set; }

    [Column("f_userhint")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FUserhint { get; set; }

    [Column("f_userapprover")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FUserapprover { get; set; }

    [Column("f_usercomment")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FUsercomment { get; set; }

    [Column("f_userpathimage")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FUserpathimage { get; set; }

    [Column("f_userskincolor")]
    [StringLength(50)]
    [Unicode(false)]
    public string? FUserskincolor { get; set; }

    [Column("f_userregister")]
    [StringLength(50)]
    [Unicode(false)]
    public string? FUserregister { get; set; }

    /// <summary>
    /// 0=Default Off
    /// 1=Admin
    /// 2=User
    /// </summary>
    [Column("f_userstatus", TypeName = "numeric(1, 0)")]
    public decimal? FUserstatus { get; set; }

    [Column("f_lastmodified", TypeName = "datetime")]
    public DateTime? FLastmodified { get; set; }

    [Column("f_idcard")]
    [StringLength(13)]
    [Unicode(false)]
    public string? FIdcard { get; set; }

    [Column("f_picture", TypeName = "image")]
    public byte[]? FPicture { get; set; }
}
