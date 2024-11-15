using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_LogProtocal")]
public partial class TLogProtocal
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("MachineID")]
    [StringLength(20)]
    [Unicode(false)]
    public string? MachineId { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string? Mode { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string? SendRecv { get; set; }

    [Column("ClassID")]
    [StringLength(5)]
    [Unicode(false)]
    public string? ClassId { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? ClassDesc { get; set; }

    [StringLength(1000)]
    [Unicode(false)]
    public string? ProtocalFullText { get; set; }

    [Column(TypeName = "date")]
    public DateTime? StampDate { get; set; }

    public TimeSpan? StampTime { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual TLogDoorActive? TLogDoorActive { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual TLogShelfActive? TLogShelfActive { get; set; }

    [InverseProperty("LogProtocal")]
    public virtual ICollection<TLogSlotActive> TLogSlotActives { get; set; } = new List<TLogSlotActive>();
}
