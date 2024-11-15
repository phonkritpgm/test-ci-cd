using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("PresNo", "PresSeq", "PresDate")]
[Table("T_Prescription")]
[Index("DrugCode", Name = "IX_Drug_code")]
[Index("PatAn", Name = "IX_pat_an")]
[Index("PatHn", Name = "IX_pat_hn")]
[Index("PresNo", "PresSeq", "PatHn", "DrugCode", Name = "IX_pres_no_pres_seq_pat_hn_drug_code")]
public partial class TPrescription
{
    [Column("pres_runningno")]
    public int PresRunningno { get; set; }

    [Key]
    [Column("pres_no")]
    [StringLength(20)]
    [Unicode(false)]
    public string PresNo { get; set; } = null!;

    [Key]
    [Column("pres_seq", TypeName = "numeric(2, 0)")]
    public decimal PresSeq { get; set; }

    [Key]
    [Column("pres_date")]
    [StringLength(10)]
    [Unicode(false)]
    public string PresDate { get; set; } = null!;

    [Column("pres_barcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PresBarcode { get; set; }

    [Column("pat_hn")]
    [StringLength(15)]
    [Unicode(false)]
    public string? PatHn { get; set; }

    [Column("pat_an")]
    [StringLength(15)]
    [Unicode(false)]
    public string? PatAn { get; set; }

    [Column("pat_name")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PatName { get; set; }

    [Column("ward_code")]
    [StringLength(20)]
    [Unicode(false)]
    public string? WardCode { get; set; }

    [Column("ward_desc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? WardDesc { get; set; }

    [Column("pat_roomcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PatRoomcode { get; set; }

    [Column("pat_roomdesc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? PatRoomdesc { get; set; }

    [Column("pat_bedcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PatBedcode { get; set; }

    [Column("pat_beddesc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? PatBeddesc { get; set; }

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("drug_name")]
    [StringLength(200)]
    [Unicode(false)]
    public string? DrugName { get; set; }

    [Column("pres_orderqty", TypeName = "decimal(10, 2)")]
    public decimal? PresOrderqty { get; set; }

    [Column("pres_orderunitcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PresOrderunitcode { get; set; }

    [Column("pres_orderunitdesc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PresOrderunitdesc { get; set; }

    [Column("pres_instructioncode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PresInstructioncode { get; set; }

    [Column("pres_instructiondesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PresInstructiondesc { get; set; }

    [Column("pres_dosage", TypeName = "decimal(10, 2)")]
    public decimal? PresDosage { get; set; }

    [Column("pres_dosageunit")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PresDosageunit { get; set; }

    [Column("pres_frequencycode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PresFrequencycode { get; set; }

    [Column("pres_frequencydesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PresFrequencydesc { get; set; }

    [Column("pres_noteprocessing")]
    [StringLength(500)]
    [Unicode(false)]
    public string? PresNoteprocessing { get; set; }

    [Column("pres_userorderby")]
    [StringLength(100)]
    [Unicode(false)]
    public string? PresUserorderby { get; set; }

    [Column("pres_useracceptby")]
    [StringLength(100)]
    [Unicode(false)]
    public string? PresUseracceptby { get; set; }

    [Column("pres_ordercreatedate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PresOrdercreatedate { get; set; }

    [Column("pres_ordercreatetime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? PresOrdercreatetime { get; set; }

    [Column("pres_orderacceptdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PresOrderacceptdate { get; set; }

    [Column("pres_orderaccepttime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? PresOrderaccepttime { get; set; }

    [Column("pres_fromlocationcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PresFromlocationcode { get; set; }

    [Column("pres_fromlocationdesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PresFromlocationdesc { get; set; }

    [Column("pres_crititallevel")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PresCrititallevel { get; set; }

    [Column("pres_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PresStatus { get; set; }

    [Column("pres_statusdesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PresStatusdesc { get; set; }

    [Column("pres_dispensedstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PresDispensedstatus { get; set; }

    [Column("pres_dispenseddesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? PresDispenseddesc { get; set; }

    [Column("pick_orderqty", TypeName = "decimal(10, 2)")]
    public decimal? PickOrderqty { get; set; }

    [Column("pick_ordertime", TypeName = "datetime")]
    public DateTime? PickOrdertime { get; set; }

    [Column("pres_finishtime", TypeName = "datetime")]
    public DateTime? PresFinishtime { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }

    [Column("pick_no")]
    [StringLength(25)]
    [Unicode(false)]
    public string? PickNo { get; set; }

    [Column("insert_dt", TypeName = "datetime")]
    public DateTime? InsertDt { get; set; }
}
