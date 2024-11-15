using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("RunningNo", "PrescriptionNo", "PrescriptionDesc", "PrescriptionDate", "Seq")]
[Table("T_PrescriptionReturn")]
public partial class TPrescriptionReturn
{
    [Key]
    public int RunningNo { get; set; }

    [Key]
    [Column(TypeName = "numeric(10, 0)")]
    public decimal PrescriptionNo { get; set; }

    [Key]
    [StringLength(20)]
    [Unicode(false)]
    public string PrescriptionDesc { get; set; } = null!;

    [Key]
    [StringLength(10)]
    [Unicode(false)]
    public string PrescriptionDate { get; set; } = null!;

    [Column("CreateDT", TypeName = "datetime")]
    public DateTime CreateDt { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string TargetDate { get; set; } = null!;

    [StringLength(8)]
    [Unicode(false)]
    public string TargetTime { get; set; } = null!;

    [Key]
    [Column(TypeName = "numeric(2, 0)")]
    public decimal Seq { get; set; }

    [Column(TypeName = "numeric(2, 0)")]
    public decimal? SeqMax { get; set; }

    [Column("PatHN")]
    [StringLength(20)]
    [Unicode(false)]
    public string PatHn { get; set; } = null!;

    [Column("PatAN")]
    [StringLength(20)]
    [Unicode(false)]
    public string PatAn { get; set; } = null!;

    [StringLength(200)]
    [Unicode(false)]
    public string PatNm { get; set; } = null!;

    [StringLength(20)]
    [Unicode(false)]
    public string WardCd { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string WardNm { get; set; } = null!;

    [StringLength(20)]
    [Unicode(false)]
    public string DrugCd { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string DrugNm { get; set; } = null!;

    [Column(TypeName = "numeric(6, 2)")]
    public decimal OrderQty { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string UnitNm { get; set; } = null!;

    [Column(TypeName = "numeric(6, 2)")]
    public decimal Dosage { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string DosageUnit { get; set; } = null!;

    [StringLength(10)]
    [Unicode(false)]
    public string? InstructionCd { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? InstructionNm { get; set; }

    [StringLength(2)]
    [Unicode(false)]
    public string PriorityCd { get; set; } = null!;

    [StringLength(30)]
    [Unicode(false)]
    public string? PriorityNm { get; set; }

    [Column(TypeName = "numeric(1, 0)")]
    public decimal? StatPrn { get; set; }

    [Column(TypeName = "numeric(1, 0)")]
    public decimal? HialertDrug { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? FrequencyCd { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string? FrequencyTime { get; set; }

    [StringLength(400)]
    [Unicode(false)]
    public string? NotProcessing { get; set; }

    [Column("MachLocationID")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MachLocationId { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? MachLocationDesc { get; set; }

    [Column(TypeName = "numeric(1, 0)")]
    public decimal? ProcessNo { get; set; }

    [Column("ProcessID")]
    [StringLength(20)]
    [Unicode(false)]
    public string? ProcessId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? ProcessDesc { get; set; }

    [Column("UserID")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string? UserNm { get; set; }

    [Column("UserID2")]
    [StringLength(20)]
    [Unicode(false)]
    public string? UserId2 { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string? UserNm2 { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string? PickDate { get; set; }

    [StringLength(8)]
    [Unicode(false)]
    public string? PickTime { get; set; }

    [Column(TypeName = "numeric(1, 0)")]
    public decimal? ReturnStatus { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string? ReturnDesc { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LastModified { get; set; }
}
