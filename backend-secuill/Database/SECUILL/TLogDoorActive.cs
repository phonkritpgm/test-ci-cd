using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_LogDoorActive")]
public partial class TLogDoorActive
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("ProtocalID")]
    public int? ProtocalId { get; set; }

    [Column("unit_id")]
    [StringLength(2)]
    [Unicode(false)]
    public string? UnitId { get; set; }

    [Column("door_status")]
    [StringLength(2)]
    [Unicode(false)]
    public string? DoorStatus { get; set; }

    [ForeignKey("Id")]
    [InverseProperty("TLogDoorActive")]
    public virtual TLogProtocal IdNavigation { get; set; } = null!;
}
