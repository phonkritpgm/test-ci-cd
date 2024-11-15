using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("T_PharmacyPrintStock")]
public partial class TPharmacyPrintStock
{
    [Column("a")]
    [StringLength(10)]
    public string? A { get; set; }
}
