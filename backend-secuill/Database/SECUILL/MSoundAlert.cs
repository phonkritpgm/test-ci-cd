using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_SoundAlert")]
public partial class MSoundAlert
{
    [Key]
    [Column("sound_code", TypeName = "numeric(3, 0)")]
    public decimal SoundCode { get; set; }

    [Column("sound_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? SoundName { get; set; }

    [Column("sound_path")]
    [StringLength(20)]
    [Unicode(false)]
    public string? SoundPath { get; set; }

    [Column("sound_binary")]
    public string? SoundBinary { get; set; }

    [Column("sound_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? SoundStatus { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
