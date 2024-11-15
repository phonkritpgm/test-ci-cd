using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("BedCode", "BedSeq")]
[Table("M_Bed")]
public partial class MBed
{
    [Key]
    [Column("bed_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string BedCode { get; set; } = null!;

    [Key]
    [Column("bed_seq", TypeName = "numeric(2, 0)")]
    public decimal BedSeq { get; set; }

    [Column("room_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? RoomCode { get; set; }

    [Column("bed_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? BedName { get; set; }

    [Column("bed_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? BedStatus { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
