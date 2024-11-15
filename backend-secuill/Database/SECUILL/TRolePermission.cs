using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_RolePermissions")]
public partial class TRolePermission
{
    [Key]
    [Column("roleper_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string RoleperId { get; set; } = null!;

    [Column("per_id")]
    [StringLength(10)]
    [Unicode(false)]
    public string PerId { get; set; } = null!;

    [Column("modularfunc_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string? ModularfuncCode { get; set; }

    [Column("rolper_desc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? RolperDesc { get; set; }

    [Column("rolper_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? RolperStatus { get; set; }
}
