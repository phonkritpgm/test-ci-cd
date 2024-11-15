using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Modular")]
public partial class MModular
{
    [Key]
    [Column("modular_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string ModularCode { get; set; } = null!;

    [Column("modular_name")]
    [StringLength(30)]
    [Unicode(false)]
    public string? ModularName { get; set; }

    [Column("modular_desc")]
    [StringLength(30)]
    [Unicode(false)]
    public string? ModularDesc { get; set; }

    [Column("modular_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? ModularStatus { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
