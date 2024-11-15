using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_LogSlotActive")]
public partial class TLogSlotActive
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("LogProtocalID")]
    public int? LogProtocalId { get; set; }

    [Column("slot_group")]
    [StringLength(2)]
    [Unicode(false)]
    public string? SlotGroup { get; set; }

    [Column("slot_id")]
    [StringLength(2)]
    [Unicode(false)]
    public string? SlotId { get; set; }

    [Column("slot_event")]
    [StringLength(2)]
    [Unicode(false)]
    public string? SlotEvent { get; set; }

    [Column("slot_resp")]
    [StringLength(2)]
    [Unicode(false)]
    public string? SlotResp { get; set; }

    [ForeignKey("LogProtocalId")]
    [InverseProperty("TLogSlotActives")]
    public virtual TLogProtocal? LogProtocal { get; set; }
}
