using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_LogShelfActive")]
public partial class TLogShelfActive
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("LogProtocalID")]
    public int? LogProtocalId { get; set; }

    [Column("shelf_id")]
    [StringLength(2)]
    [Unicode(false)]
    public string? ShelfId { get; set; }

    [Column("shelf_status")]
    [StringLength(2)]
    [Unicode(false)]
    public string? ShelfStatus { get; set; }

    [ForeignKey("Id")]
    [InverseProperty("TLogShelfActive")]
    public virtual TLogProtocal IdNavigation { get; set; } = null!;
}
