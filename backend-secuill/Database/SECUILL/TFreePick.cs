using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("FreepickRunningno", "FreepickNo", "FreepickSeq")]
[Table("T_FreePick")]
public partial class TFreePick
{
    [Key]
    [Column("freepick_runningno")]
    [StringLength(20)]
    [Unicode(false)]
    public string FreepickRunningno { get; set; } = null!;

    [Key]
    [Column("freepick_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string FreepickNo { get; set; } = null!;

    [Key]
    [Column("freepick_seq", TypeName = "numeric(3, 0)")]
    public decimal FreepickSeq { get; set; }

    [Column("pat_hn")]
    [StringLength(15)]
    [Unicode(false)]
    public string? PatHn { get; set; }

    [Column("slot_no")]
    [StringLength(15)]
    [Unicode(false)]
    public string? SlotNo { get; set; }

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("db_qty", TypeName = "decimal(4, 2)")]
    public decimal? DbQty { get; set; }

    [Column("machine_resp", TypeName = "decimal(4, 2)")]
    public decimal? MachineResp { get; set; }

    [Column("freepick_qty", TypeName = "decimal(4, 2)")]
    public decimal? FreepickQty { get; set; }

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId { get; set; }

    [Column("freepick_idenslotno")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FreepickIdenslotno { get; set; }

    [Column("freepick_idendrugcode")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FreepickIdendrugcode { get; set; }

    [Column("freepick_casecode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FreepickCasecode { get; set; }

    [Column("freepick_noteprocess")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FreepickNoteprocess { get; set; }

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

    [Column("freepick_errorstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? FreepickErrorstatus { get; set; }

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

    [Column("freepick_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FreepickDate { get; set; }

    [Column("freepick_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? FreepickTime { get; set; }
}
