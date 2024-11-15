using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("UpdateProgram")]
public partial class UpdateProgram
{
    [Key]
    public int UpdateProgramKey { get; set; }

    public int? ProgramKey { get; set; }

    [Column("UpdateID")]
    public int? UpdateId { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? ClientUploadName { get; set; }

    [Column("ClientUploadIP")]
    [StringLength(15)]
    [Unicode(false)]
    public string? ClientUploadIp { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Version { get; set; }

    [StringLength(1000)]
    [Unicode(false)]
    public string? UpdateDetail { get; set; }

    public short? UpdateStatus { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UploadTime { get; set; }

    public byte[]? ProgramUpdateByte { get; set; }

    public int? ProgramUpdateSize { get; set; }

    public byte[]? SourceUpdateByte { get; set; }

    public int? SourceUpdateSize { get; set; }
}
