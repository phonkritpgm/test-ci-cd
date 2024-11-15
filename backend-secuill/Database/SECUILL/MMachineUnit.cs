using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_MachineUnit")]
public partial class MMachineUnit
{
    [Key]
    [Column("unit_no")]
    [StringLength(10)]
    [Unicode(false)]
    public string UnitNo { get; set; } = null!;

    [Column("unit_id")]
    [StringLength(2)]
    [Unicode(false)]
    public string? UnitId { get; set; }

    [Column("unit_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UnitName { get; set; }

    [Column("unit_desc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UnitDesc { get; set; }

    [Column("unit_doorstatus")]
    [StringLength(2)]
    [Unicode(false)]
    public string? UnitDoorstatus { get; set; }

    [Column("unit_doorstatusdesc")]
    [StringLength(50)]
    [Unicode(false)]
    public string? UnitDoorstatusdesc { get; set; }

    [Column("unit_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? UnitStatus { get; set; }

    [Column("unit_size_length", TypeName = "decimal(4, 2)")]
    public decimal? UnitSizeLength { get; set; }

    [Column("unit_size_width", TypeName = "decimal(4, 2)")]
    public decimal? UnitSizeWidth { get; set; }

    [Column("unit_size_height", TypeName = "decimal(4, 2)")]
    public decimal? UnitSizeHeight { get; set; }

    [Column("unit_unitofmeasure")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UnitUnitofmeasure { get; set; }

    [Column("unit_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UnitUsercreate { get; set; }

    [Column("unit_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UnitCreatedate { get; set; }

    [Column("unit_createtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? UnitCreatetime { get; set; }

    [Column("unit_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UnitUserupdate { get; set; }

    [Column("unit_updatedate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? UnitUpdatedate { get; set; }

    [Column("unit_updatetime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? UnitUpdatetime { get; set; }
}
