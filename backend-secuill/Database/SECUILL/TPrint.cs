using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_Print")]
public partial class TPrint
{
    [Key]
    [Column("print_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string PrintNo { get; set; } = null!;

    [Column("print_mode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PrintMode { get; set; }

    [Column("print_pickno")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PrintPickno { get; set; }

    [Column("print_freepickno")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PrintFreepickno { get; set; }

    [Column("print_refillno")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PrintRefillno { get; set; }

    [Column("print_itemcount")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PrintItemcount { get; set; }

    [Column("pres_printstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PresPrintstatus { get; set; }

    [Column("pres_userreprint")]
    [StringLength(100)]
    [Unicode(false)]
    public string? PresUserreprint { get; set; }

    [Column("pres_reprintcounter", TypeName = "numeric(2, 0)")]
    public decimal? PresReprintcounter { get; set; }

    [Column("pres_reprintdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PresReprintdate { get; set; }

    [Column("pres_reprinttime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? PresReprinttime { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
