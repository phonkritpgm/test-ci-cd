using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("RoomCode", "RoomSeq")]
[Table("M_Room")]
public partial class MRoom
{
    [Key]
    [Column("room_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string RoomCode { get; set; } = null!;

    [Key]
    [Column("room_seq", TypeName = "numeric(2, 0)")]
    public decimal RoomSeq { get; set; }

    [Column("ward_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? WardCode { get; set; }

    [Column("room_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? RoomName { get; set; }

    [Column("room_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? RoomStatus { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
