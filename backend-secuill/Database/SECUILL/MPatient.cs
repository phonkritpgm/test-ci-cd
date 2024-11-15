using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[PrimaryKey("PatRunningno", "PatHn")]
[Table("M_Patient")]
[Index("PatAn", Name = "IX_pat_an")]
[Index("PatHn", Name = "IX_pat_hn")]
public partial class MPatient
{
    [Key]
    [Column("pat_runningno")]
    [StringLength(20)]
    [Unicode(false)]
    public string PatRunningno { get; set; } = null!;

    [Key]
    [Column("pat_hn")]
    [StringLength(15)]
    [Unicode(false)]
    public string PatHn { get; set; } = null!;

    [Column("pat_an")]
    [StringLength(15)]
    [Unicode(false)]
    public string? PatAn { get; set; }

    [Column("pat_vn")]
    [StringLength(15)]
    [Unicode(false)]
    public string? PatVn { get; set; }

    [Column("pat_title")]
    [StringLength(30)]
    [Unicode(false)]
    public string? PatTitle { get; set; }

    [Column("pat_name")]
    [StringLength(150)]
    [Unicode(false)]
    public string? PatName { get; set; }

    [Column("pat_sex")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PatSex { get; set; }

    [Column("pat_idcard")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PatIdcard { get; set; }

    [Column("pat_patientdob", TypeName = "datetime")]
    public DateTime? PatPatientdob { get; set; }

    [Column("pat_blood")]
    [StringLength(2)]
    [Unicode(false)]
    public string? PatBlood { get; set; }

    [Column("pat_congenital_disease")]
    [StringLength(50)]
    [Unicode(false)]
    public string? PatCongenitalDisease { get; set; }

    [Column("pat_diagnosis")]
    [StringLength(100)]
    [Unicode(false)]
    public string? PatDiagnosis { get; set; }

    [Column("pat_rights")]
    [StringLength(100)]
    [Unicode(false)]
    public string? PatRights { get; set; }

    [Column("pat_wardcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PatWardcode { get; set; }

    [Column("pat_roomcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PatRoomcode { get; set; }

    [Column("pat_bedcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? PatBedcode { get; set; }

    [Column("pat_admitteddate", TypeName = "datetime")]
    public DateTime? PatAdmitteddate { get; set; }

    [Column("pat_dischargeddate", TypeName = "datetime")]
    public DateTime? PatDischargeddate { get; set; }

    [Column("pat_doctorcode")]
    [StringLength(20)]
    [Unicode(false)]
    public string? PatDoctorcode { get; set; }

    [Column("pat_doctorname")]
    [StringLength(50)]
    [Unicode(false)]
    public string? PatDoctorname { get; set; }

    [Column("pat_image", TypeName = "image")]
    public byte[]? PatImage { get; set; }

    [Column("pat_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? PatStatus { get; set; }

    [Column("pat_statusdesc")]
    [StringLength(15)]
    [Unicode(false)]
    public string? PatStatusdesc { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
