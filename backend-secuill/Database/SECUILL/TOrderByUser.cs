using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("OrderRunningno", "OrderNo", "OrderSeq")]
[Table("T_OrderByUser")]
public partial class TOrderByUser
{
    [Key]
    [Column("order_runningno")]
    [StringLength(20)]
    [Unicode(false)]
    public string OrderRunningno { get; set; } = null!;

    [Key]
    [Column("order_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string OrderNo { get; set; } = null!;

    [Key]
    [Column("order_seq", TypeName = "numeric(2, 0)")]
    public decimal OrderSeq { get; set; }

    [Column("order_seqmax", TypeName = "numeric(2, 0)")]
    public decimal? OrderSeqmax { get; set; }

    [Column("order_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string OrderDate { get; set; }

    [Column("order_barcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? OrderBarcode { get; set; }

    [Column("pat_hn")]
    [StringLength(15)]
    [Unicode(false)]
    public string? PatHn { get; set; }

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("order_qty", TypeName = "decimal(10, 2)")]
    public decimal? OrderQty { get; set; }

    [Column("order_case")]
    [StringLength(20)]
    [Unicode(false)]
    public string? OrderCase { get; set; }

    [Column("order_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? OrderUsercreate { get; set; }

    [Column("order_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? OrderCreatedate { get; set; }

    [Column("order_createtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? OrderCreatetime { get; set; }

    [Column("order_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? OrderStatus { get; set; }

    [Column("order_statusdesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? OrderStatusdesc { get; set; }

    [Column("order_dispensedstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? OrderDispensedstatus { get; set; }

    [Column("order_dispenseddesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? OrderDispenseddesc { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }

    [Column("pick_orderqty", TypeName = "decimal(10, 2)")]
    public decimal? PickOrderqty { get; set; }

    [Column("pick_ordertime", TypeName = "datetime")]
    public DateTime? PickOrdertime { get; set; }

    [Column("pick_no")]
    [StringLength(25)]
    public string?  PickNo {  get; set; }

    [Column("pres_finishtime", TypeName = "datetime")]
    public DateTime? PresFinishtime { get; set; }

    [Column("pres_noteprocessing")]
    [StringLength(500)]
    [Unicode(false)]
    public string? PresNoteprocessing { get; set; }

}
