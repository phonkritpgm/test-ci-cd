using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Title")]
public partial class MTitle
{
    [Key]
    [Column("title_id", TypeName = "numeric(3, 0)")]
    public decimal TitleId { get; set; }

    [Column("title_name")]
    [StringLength(10)]
    [Unicode(false)]
    public string? TitleName { get; set; }

    [Column("title_desc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? TitleDesc { get; set; }

    [Column("title_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? TitleUserupdate { get; set; }

    [Column("title_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? TitleStatus { get; set; }
}
