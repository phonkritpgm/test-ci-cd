using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Position")]
public partial class MPosition
{
    [Key]
    [Column("post_id", TypeName = "numeric(3, 0)")]
    public decimal PostId { get; set; }

    [Column("post_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string PostName { get; set; } = null!;

    [Column("post_desc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PostDesc { get; set; }

    [Column("post_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PostUserupdate { get; set; }

    [Column("post_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PostStatus { get; set; }
}
