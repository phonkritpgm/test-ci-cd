using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill.Models;

[PrimaryKey("FPrescriptionno", "FSeq", "FRunningno", "FPrescriptiondate")]
[Table("tb_thaneshosp_middle")]
public partial class TbThaneshospMiddle
{
    [Key]
    [Column("f_prescriptionno")]
    [StringLength(20)]
    [Unicode(false)]
    public string FPrescriptionno { get; set; } = null!;

    [Key]
    [Column("f_seq", TypeName = "numeric(2, 0)")]
    public decimal FSeq { get; set; }

    [Column("f_seqmax", TypeName = "numeric(2, 0)")]
    public decimal? FSeqmax { get; set; }

    [Key]
    [Column("f_runningno")]
    [StringLength(100)]
    [Unicode(false)]
    public string FRunningno { get; set; } = null!;

    [Key]
    [Column("f_prescriptiondate")]
    [StringLength(10)]
    [Unicode(false)]
    public string FPrescriptiondate { get; set; } = null!;

    [Column("f_ordercreatedate", TypeName = "datetime")]
    public DateTime FOrdercreatedate { get; set; }

    [Column("f_ordertargetdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FOrdertargetdate { get; set; }

    [Column("f_ordertargettime")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FOrdertargettime { get; set; }

    [Column("f_pharmacylocationcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FPharmacylocationcode { get; set; }

    [Column("f_pharmacylocationdesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FPharmacylocationdesc { get; set; }

    [Column("f_doctorcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FDoctorcode { get; set; }

    [Column("f_doctorname")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FDoctorname { get; set; }

    [Column("f_userorderby")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FUserorderby { get; set; }

    [Column("f_useracceptby")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FUseracceptby { get; set; }

    [Column("f_orderacceptdate", TypeName = "datetime")]
    public DateTime? FOrderacceptdate { get; set; }

    [Column("f_orderacceptfromip")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FOrderacceptfromip { get; set; }

    [Column("f_dispensestatus", TypeName = "numeric(1, 0)")]
    public decimal? FDispensestatus { get; set; }

    [Column("f_status", TypeName = "numeric(2, 0)")]
    public decimal? FStatus { get; set; }

    [Column("f_printstatus", TypeName = "numeric(1, 0)")]
    public decimal? FPrintstatus { get; set; }

    [Column("f_hn")]
    [StringLength(15)]
    [Unicode(false)]
    public string FHn { get; set; } = null!;

    [Column("f_an")]
    [StringLength(15)]
    [Unicode(false)]
    public string? FAn { get; set; }

    [Column("f_vn")]
    [StringLength(15)]
    [Unicode(false)]
    public string? FVn { get; set; }

    [Column("f_patientname")]
    [StringLength(100)]
    [Unicode(false)]
    public string FPatientname { get; set; } = null!;

    [Column("f_sex")]
    [StringLength(2)]
    [Unicode(false)]
    public string? FSex { get; set; }

    [Column("f_patientdob", TypeName = "date")]
    public DateTime? FPatientdob { get; set; }

    [Column("f_wardcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FWardcode { get; set; }

    [Column("f_warddesc")]
    [StringLength(40)]
    [Unicode(false)]
    public string? FWarddesc { get; set; }

    [Column("f_roomcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FRoomcode { get; set; }

    [Column("f_roomdesc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FRoomdesc { get; set; }

    [Column("f_bedcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FBedcode { get; set; }

    [Column("f_beddesc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FBeddesc { get; set; }

    [Column("f_drugallergy")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FDrugallergy { get; set; }

    [Column("f_tomachineno", TypeName = "numeric(2, 0)")]
    public decimal FTomachineno { get; set; }

    [Column("f_orderitemcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string FOrderitemcode { get; set; } = null!;

    [Column("f_orderitemname")]
    [StringLength(100)]
    [Unicode(false)]
    public string FOrderitemname { get; set; } = null!;

    [Column("f_orderqty", TypeName = "numeric(8, 2)")]
    public decimal FOrderqty { get; set; }

    [Column("f_orderunitcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FOrderunitcode { get; set; }

    [Column("f_orderunitdesc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FOrderunitdesc { get; set; }

    [Column("f_dosage", TypeName = "numeric(8, 2)")]
    public decimal? FDosage { get; set; }

    [Column("f_dosageunit")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FDosageunit { get; set; }

    [Column("f_binlocation")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FBinlocation { get; set; }

    [Column("f_itemidentify")]
    [StringLength(100)]
    public string? FItemidentify { get; set; }

    [Column("f_itemlotno")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FItemlotno { get; set; }

    [Column("f_itemlotexpire", TypeName = "date")]
    public DateTime? FItemlotexpire { get; set; }

    [Column("f_instructioncode")]
    [StringLength(20)]
    [Unicode(false)]
    public string FInstructioncode { get; set; } = null!;

    [Column("f_instructiondesc")]
    [StringLength(300)]
    [Unicode(false)]
    public string? FInstructiondesc { get; set; }

    [Column("f_highalertdrug", TypeName = "numeric(1, 0)")]
    public decimal? FHighalertdrug { get; set; }

    [Column("f_prnstat", TypeName = "numeric(1, 0)")]
    public decimal? FPrnstat { get; set; }

    [Column("f_prioritycode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FPrioritycode { get; set; }

    [Column("f_prioritydesc")]
    [StringLength(50)]
    [Unicode(false)]
    public string? FPrioritydesc { get; set; }

    [Column("f_frequencycode")]
    [StringLength(120)]
    [Unicode(false)]
    public string? FFrequencycode { get; set; }

    [Column("f_frequencydesc")]
    [StringLength(240)]
    [Unicode(false)]
    public string? FFrequencydesc { get; set; }

    [Column("f_frequencytime")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FFrequencytime { get; set; }

    [Column("f_dosagedispense")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FDosagedispense { get; set; }

    [Column("f_language", TypeName = "numeric(1, 0)")]
    public decimal? FLanguage { get; set; }

    [Column("f_durationcode", TypeName = "numeric(2, 0)")]
    public decimal? FDurationcode { get; set; }

    [Column("f_noteprocessing")]
    [StringLength(2000)]
    [Unicode(false)]
    public string? FNoteprocessing { get; set; }

    [Column("f_barcodebyhis")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FBarcodebyhis { get; set; }

    [Column("f_lastmodified", TypeName = "datetime")]
    public DateTime? FLastmodified { get; set; }

    [Column("f_comment")]
    [StringLength(2000)]
    [Unicode(false)]
    public string? FComment { get; set; }

    [Column("f_drugbagsplit", TypeName = "numeric(1, 0)")]
    public decimal? FDrugbagsplit { get; set; }

    [Column("f_opd_adminstatus", TypeName = "numeric(1, 0)")]
    public decimal? FOpdAdminstatus { get; set; }

    [Column("f_opd_admindate", TypeName = "datetime")]
    public DateTime? FOpdAdmindate { get; set; }

    [Column("f_opd_admintime")]
    [StringLength(10)]
    [Unicode(false)]
    public string? FOpdAdmintime { get; set; }

    [Column("f_opd_adminby")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FOpdAdminby { get; set; }

    [Column("f_opd_adminremark")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FOpdAdminremark { get; set; }

    [Column("f_opd_adminlocation")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FOpdAdminlocation { get; set; }

    [Column("f_opd_admincontinue")]
    [StringLength(1)]
    [Unicode(false)]
    public string? FOpdAdmincontinue { get; set; }

    [Column("f_drugformcode")]
    [StringLength(100)]
    [Unicode(false)]
    public string? FDrugformcode { get; set; }

    [Column("f_drugformdesc")]
    [StringLength(200)]
    [Unicode(false)]
    public string? FDrugformdesc { get; set; }

    [Column("RowID")]
    [StringLength(200)]
    [Unicode(false)]
    public string? RowId { get; set; }

    [Column("f_statusCheck", TypeName = "numeric(1, 0)")]
    public decimal? FStatusCheck { get; set; }

    [Column("f_dispensestatus_smt", TypeName = "numeric(1, 0)")]
    public decimal? FDispensestatusSmt { get; set; }

    [Column("f_DosageQty", TypeName = "numeric(8, 2)")]
    public decimal? FDosageQty { get; set; }

    [Column("f_MedRecStatus", TypeName = "numeric(1, 0)")]
    public decimal? FMedRecStatus { get; set; }

    [Column("f_MedChemoStatus", TypeName = "numeric(1, 0)")]
    public decimal? FMedChemoStatus { get; set; }

    [Column("f_recordno")]
    [StringLength(50)]
    [Unicode(false)]
    public string? FRecordno { get; set; }

    [Column("f_offdatetime", TypeName = "datetime")]
    public DateTime? FOffdatetime { get; set; }

    [Column("f_dispensestatus_secuill")]
    public  decimal? f_dispensestatus_secuill { get; set; }

    [Column("f_dispense_secuill_by")]
    [StringLength(150)]
    public string? f_dispense_secuill_by { get; set; }

    [Column("f_dispense_secuill_time")]
    public DateTime? f_dispense_secuill_time { get; set; }
}
