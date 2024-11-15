using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("RefillRunningno", "RefillNo", "RefillSeq")]
[Table("T_DrugRefill")]
public partial class TDrugRefill
{
    [Key]
    [Column("refill_runningno")]
    [StringLength(20)]
    [Unicode(false)]
    public string RefillRunningno { get; set; } = null!;

    [Key]
    [Column("refill_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string RefillNo { get; set; } = null!;

    [Key]
    [Column("refill_seq", TypeName = "numeric(3, 0)")]
    public decimal RefillSeq { get; set; }

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

    [Column("refill_qty", TypeName = "decimal(6, 2)")]
    public decimal? RefillQty { get; set; }

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId { get; set; }

    [Column("refill_noteprocess")]
    [StringLength(200)]
    [Unicode(false)]
    public string? RefillNoteprocess { get; set; }

    [Column("refill_drugidentify")]
    [StringLength(15)]
    [Unicode(false)]
    public string? RefillDrugidentify { get; set; }

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

    [Column("refill_case")]
    [StringLength(1)]
    [Unicode(false)]
    public string? RefillCase { get; set; }

    [Column("refill_errorcode", TypeName = "numeric(3, 0)")]
    public decimal? RefillErrorcode { get; set; }

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

    [Column("refill_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? RefillDate { get; set; }

    [Column("refill_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? RefillTime { get; set; }
}
