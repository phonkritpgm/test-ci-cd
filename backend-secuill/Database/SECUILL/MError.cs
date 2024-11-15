using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Error")]
public partial class MError
{
    [Key]
    [Column("error_code", TypeName = "numeric(3, 0)")]
    public decimal ErrorCode { get; set; }

    [Column("error_desc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? ErrorDesc { get; set; }

    [Column("error_solution")]
    [StringLength(300)]
    [Unicode(false)]
    public string? ErrorSolution { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
