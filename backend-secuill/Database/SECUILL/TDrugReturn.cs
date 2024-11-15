using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("ReturnId", "ReturnRef", "DrugCode")]
[Table("T_DrugReturn")]
public partial class TDrugReturn
{
    [Key]
    [Column("return_id")]
    public int ReturnId { get; set; }

    [Key]
    [Column("return_ref")]
    [StringLength(20)]
    [Unicode(false)]
    public string ReturnRef { get; set; } = null!;

    [Key]
    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DrugCode { get; set; } = null!;

    [Column("pick_qty", TypeName = "decimal(4, 2)")]
    public decimal? PickQty { get; set; }

    [Column("return_qty", TypeName = "decimal(4, 2)")]
    public decimal? ReturnQty { get; set; }

    [Column("balance_qty", TypeName = "decimal(4, 2)")]
    public decimal? BalanceQty { get; set; }

    [Column("user_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId { get; set; }

    [Column("user_note")]
    [StringLength(400)]
    [Unicode(false)]
    public string? UserNote { get; set; }

    [Column("return_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ReturnDate { get; set; }

    [Column("return_time")]
    [StringLength(5)]
    [Unicode(false)]
    public string? ReturnTime { get; set; }
}
