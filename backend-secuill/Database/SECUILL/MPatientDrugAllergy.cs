using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_PatientDrugAllergy")]
public partial class MPatientDrugAllergy
{
    [Key]
    [Column("drugallergy_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string DrugallergyId { get; set; } = null!;

    [Column("pat_hn")]
    [StringLength(20)]
    [Unicode(false)]
    public string PatHn { get; set; } = null!;

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCode { get; set; }

    [Column("drugallergy_desc")]
    [StringLength(2000)]
    [Unicode(false)]
    public string? DrugallergyDesc { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
