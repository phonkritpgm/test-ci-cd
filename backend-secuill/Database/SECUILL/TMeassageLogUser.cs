using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("T_MeassageLogUser")]
public partial class TMeassageLogUser
{
    [Key]
    [Column("messuser_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string MessuserId { get; set; } = null!;

    [Column("mess_id")]
    [StringLength(20)]
    [Unicode(false)]
    public string MessId { get; set; } = null!;

    [Column("messuser_sendto")]
    [StringLength(20)]
    [Unicode(false)]
    public string MessuserSendto { get; set; } = null!;

    [Column("messuser_readstatus")]
    [StringLength(1)]
    [Unicode(false)]
    public string? MessuserReadstatus { get; set; }

    [Column("messuser_readdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MessuserReaddate { get; set; }

    [Column("messuser_readtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? MessuserReadtime { get; set; }

    [Column("messuser_location")]
    [StringLength(30)]
    [Unicode(false)]
    public string? MessuserLocation { get; set; }

    [Column("messuser_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? MessuserStatus { get; set; }

    [Column("messuser_timestamp", TypeName = "datetime")]
    public DateTime? MessuserTimestamp { get; set; }
}
