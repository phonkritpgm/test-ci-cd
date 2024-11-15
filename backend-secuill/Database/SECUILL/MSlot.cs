using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Slot")]
public partial class MSlot
{
    [Key]
    [Column("slot_no")]
    [StringLength(15)]
    [Unicode(false)]
    public string SlotNo { get; set; } = null!;

    [Column("shelf_no")]
    [StringLength(13)]
    [Unicode(false)]
    public string? ShelfNo { get; set; }

    [Column("slot_groupid")]
    [StringLength(2)]
    [Unicode(false)]
    public string SlotGroupid { get; set; } = null!;

    [Column("slot_id")]
    [StringLength(2)]
    [Unicode(false)]
    public string SlotId { get; set; } = null!;

    [Column("slot_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? SlotName { get; set; }

    [Column("slot_locationid")]
    [StringLength(10)]
    [Unicode(false)]
    public string? SlotLocationid { get; set; }

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("slot_qty", TypeName = "decimal(4, 2)")]
    public decimal? SlotQty { get; set; }

    [Column("slot_min", TypeName = "decimal(4, 2)")]
    public decimal? SlotMin { get; set; }

    [Column("slot_max", TypeName = "decimal(4, 2)")]
    public decimal? SlotMax { get; set; }

    [Column("slot_priority", TypeName = "numeric(2, 0)")]
    public decimal? SlotPriority { get; set; }

    [Column("slot_status")]
    [StringLength(2)]
    [Unicode(false)]
    public string? SlotStatus { get; set; }

    [Column("slot_statusdesc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? SlotStatusdesc { get; set; }

    [Column("slot_desc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? SlotDesc { get; set; }

    [Column("slot_size_length", TypeName = "decimal(4, 2)")]
    public decimal? SlotSizeLength { get; set; }

    [Column("slot_size_width", TypeName = "decimal(4, 2)")]
    public decimal? SlotSizeWidth { get; set; }

    [Column("slot_size_height", TypeName = "decimal(4, 2)")]
    public decimal? SlotSizeHeight { get; set; }

    [Column("slot_unitofmeasure")]
    [StringLength(10)]
    [Unicode(false)]
    public string? SlotUnitofmeasure { get; set; }

    [Column("slot_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? SlotUsercreate { get; set; }

    [Column("slot_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? SlotCreatedate { get; set; }

    [Column("slot_createtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? SlotCreatetime { get; set; }

    [Column("slot_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? SlotUserupdate { get; set; }

    [Column("slot_updatedate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? SlotUpdatedate { get; set; }

    [Column("slot_updatetime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? SlotUpdatetime { get; set; }
}
