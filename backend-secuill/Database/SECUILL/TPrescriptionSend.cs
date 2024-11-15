using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("T_PrescriptionSend")]
public partial class TPrescriptionSend
{
    public int PrescriptionGroupKey { get; set; }

    [Column("pick_no")]
    [StringLength(30)]
    [Unicode(false)]
    public string PickNo { get; set; } = null!;

    [Column("pres_no")]
    [StringLength(30)]
    [Unicode(false)]
    public string PresNo { get; set; } = null!;

    [Column("pres_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string PresDate { get; set; } = null!;

    [Column("pat_hn")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PatHn { get; set; }

    [Column("drug_code")]
    [StringLength(20)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("drug_name")]
    [StringLength(150)]
    [Unicode(false)]
    public string? DrugName { get; set; }

    [Column("pres_orderqty", TypeName = "decimal(10, 2)")]
    public decimal? PresOrderqty { get; set; }

    [Column("send_date", TypeName = "date")]
    public DateTime? SendDate { get; set; }

    [Column("send_time")]
    public TimeSpan? SendTime { get; set; }
}
