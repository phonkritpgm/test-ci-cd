using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_SummaryPickPrescription")]
[Index("PresNo", "PresSeq", "PatHn", "DrugCode", Name = "IX_pres_no_pres_seq_pat_hn_drug_code")]
[Index("PickNo", Name = "IX_proc_no")]
public partial class TSummaryPickPrescription
{
    [Key]
    [Column("sum_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string SumId { get; set; } = null!;

    [Column("pick_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string PickNo { get; set; } = null!;

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

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("pick_qty", TypeName = "decimal(4, 2)")]
    public decimal? PickQty { get; set; }

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId { get; set; }

    [Column("pick_errorstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PickErrorstatus { get; set; }

    [Column("pick_desc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PickDesc { get; set; }

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

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

    [Column("sum_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? SumDate { get; set; }

    [Column("sum_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? SumTime { get; set; }

    [Column("ward_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? WardCode { get; set; }

    [Column("mess_confirm")]
    [StringLength(200)]
    [Unicode(false)]
    public string? MessConfirm { get; set; }
}
