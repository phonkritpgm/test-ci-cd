using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Shelf")]
public partial class MShelf
{
    [Key]
    [Column("shelf_no")]
    [StringLength(13)]
    [Unicode(false)]
    public string ShelfNo { get; set; } = null!;

    [Column("unit_no")]
    [StringLength(13)]
    [Unicode(false)]
    public string? UnitNo { get; set; }

    [Column("shelf_id")]
    [StringLength(2)]
    [Unicode(false)]
    public string ShelfId { get; set; } = null!;

    [Column("shelf_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? ShelfName { get; set; }

    [Column("shelf_locationid")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ShelfLocationid { get; set; }

    [Column("shelf_safebox")]
    [StringLength(1)]
    [Unicode(false)]
    public string? ShelfSafebox { get; set; }

    [Column("shelf_refrigeretor")]
    [StringLength(1)]
    [Unicode(false)]
    public string? ShelfRefrigeretor { get; set; }

    [Column("shelf_status")]
    [StringLength(2)]
    [Unicode(false)]
    public string? ShelfStatus { get; set; }

    [Column("shelf_statusdesc")]
    [StringLength(50)]
    [Unicode(false)]
    public string? ShelfStatusdesc { get; set; }

    [Column("shelf_eventstatus")]
    [StringLength(2)]
    [Unicode(false)]
    public string? ShelfEventstatus { get; set; }

    [Column("shelf_eventdesc")]
    [StringLength(50)]
    [Unicode(false)]
    public string? ShelfEventdesc { get; set; }

    [Column("shelf_size_length", TypeName = "decimal(4, 2)")]
    public decimal? ShelfSizeLength { get; set; }

    [Column("shelf_size_width", TypeName = "decimal(4, 2)")]
    public decimal? ShelfSizeWidth { get; set; }

    [Column("shelf_size_height", TypeName = "decimal(4, 2)")]
    public decimal? ShelfSizeHeight { get; set; }

    [Column("shelf_unitofmeasure")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ShelfUnitofmeasure { get; set; }

    [Column("shelf_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? ShelfUsercreate { get; set; }

    [Column("shelf_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ShelfCreatedate { get; set; }

    [Column("shelf_createtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? ShelfCreatetime { get; set; }

    [Column("shelf_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? ShelfUserupdate { get; set; }

    [Column("shelf_updatedate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ShelfUpdatedate { get; set; }

    [Column("shelf_updatetime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? ShelfUpdatetime { get; set; }
}
