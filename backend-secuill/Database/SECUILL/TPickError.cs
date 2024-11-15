using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_PickError")]
public partial class TPickError
{
    [Key]
    [Column("pickerror_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string PickerrorId { get; set; } = null!;

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularCode { get; set; }

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

    [Column("pickerror_qty", TypeName = "decimal(6, 2)")]
    public decimal? PickerrorQty { get; set; }

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId { get; set; }

    [Column("pickerror_errorcode", TypeName = "numeric(3, 0)")]
    public decimal? PickerrorErrorcode { get; set; }

    [Column("pickerror_noteprocess")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PickerrorNoteprocess { get; set; }

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

    [Column("pickerror_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PickerrorDate { get; set; }

    [Column("pickerror_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? PickerrorTime { get; set; }
}
