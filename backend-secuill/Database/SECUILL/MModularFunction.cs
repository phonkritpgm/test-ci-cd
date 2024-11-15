using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_ModularFunction")]
public partial class MModularFunction
{
    [Key]
    [Column("modularfunc_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string ModularfuncCode { get; set; } = null!;

    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string ModularCode { get; set; } = null!;

    [Column("modularfunc_name")]
    [StringLength(100)]
    [Unicode(false)]
    public string? ModularfuncName { get; set; }

    [Column("modularfunc_desc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? ModularfuncDesc { get; set; }

    [Column("modularfunc_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? ModularfuncStatus { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
