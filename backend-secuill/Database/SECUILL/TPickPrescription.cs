using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("PickRunningno", "PickNo", "PickSeq")]
[Table("T_PickPrescription")]
public partial class TPickPrescription
{
    [Key]
    [Column("pick_runningno")]
    [StringLength(20)]
    [Unicode(false)]
    public string PickRunningno { get; set; } = null!;

    [Key]
    [Column("pick_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string PickNo { get; set; } = null!;

    [Key]
    [Column("pick_seq", TypeName = "numeric(3, 0)")]
    public decimal PickSeq { get; set; }

    [Column("pres_date")]
    [StringLength(8)]
    [Unicode(false)]
    public string? PresDate { get; set; }

    [Column("pres_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string PresNo { get; set; } = null!;

    [Column("pres_seq", TypeName = "numeric(2, 0)")]
    public decimal? PresSeq { get; set; }

    [Column("pat_hn")]
    [StringLength(15)]
    [Unicode(false)]
    public string PatHn { get; set; } = null!;

    [Column("slot_no")]
    [StringLength(15)]
    [Unicode(false)]
    public string? SlotNo { get; set; }

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("db_qty", TypeName = "decimal(6, 2)")]
    public decimal? DbQty { get; set; }

    [Column("machine_resp", TypeName = "decimal(6, 2)")]
    public decimal? MachineResp { get; set; }

    [Column("pick_qty", TypeName = "decimal(4, 2)")]
    public decimal PickQty { get; set; }

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string UserId { get; set; } = null!;

    [Column("user_confirm_safebox")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserConfirmSafebox { get; set; }

    [Column("pick_noteprocess")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PickNoteprocess { get; set; }

    [Column("machine_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MachineCode { get; set; }

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

    [Column("pick_comment")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PickComment { get; set; }

    [Column("pick_errorstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PickErrorstatus { get; set; }

    [Column("pick_errorcode", TypeName = "numeric(3, 0)")]
    public decimal? PickErrorcode { get; set; }

    [Column("lot_no")]
    [StringLength(30)]
    [Unicode(false)]
    public string? LotNo { get; set; }

    [Column("lot_qty", TypeName = "decimal(6, 2)")]
    public decimal? LotQty { get; set; }

    [Column("lot_maxqty", TypeName = "decimal(6, 2)")]
    public decimal? LotMaxqty { get; set; }

    [Column("lot_exp", TypeName = "datetime")]
    public DateTime? LotExp { get; set; }

    [Column("pick_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PickDate { get; set; }

    [Column("pick_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? PickTime { get; set; }

    [Column("ward_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? WardCode { get; set; }
}
