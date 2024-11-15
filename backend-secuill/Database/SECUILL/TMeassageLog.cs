using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_MeassageLog")]
public partial class TMeassageLog
{
    [Key]
    [Column("mess_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string MessId { get; set; } = null!;

    [Column("mess_from")]
    [StringLength(15)]
    [Unicode(false)]
    public string? MessFrom { get; set; }

    [Column("mess_type")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MessType { get; set; }

    [Column("mess_subject")]
    [StringLength(30)]
    [Unicode(false)]
    public string? MessSubject { get; set; }

    [Column("mess_text")]
    [StringLength(200)]
    [Unicode(false)]
    public string? MessText { get; set; }

    [Column("mess_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? MessStatus { get; set; }

    [Column("mess_location")]
    [StringLength(30)]
    [Unicode(false)]
    public string? MessLocation { get; set; }

    [Column("mess_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MessDate { get; set; }

    [Column("mess_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? MessTime { get; set; }
}
