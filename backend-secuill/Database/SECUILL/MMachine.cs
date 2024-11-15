using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("M_Machine")]
public partial class MMachine
{
    [Column("machine_code")]
    [StringLength(10)]
    [Unicode(false)]
    public string MachineCode { get; set; } = null!;

    [Column("machine_name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? MachineName { get; set; }

    [Column("machine_locationcode")]
    [StringLength(10)]
    [Unicode(false)]
    public string? MachineLocationcode { get; set; }

    [Column("machine_locationname")]
    [StringLength(20)]
    [Unicode(false)]
    public string? MachineLocationname { get; set; }

    [Column("machine_ipaddress")]
    [StringLength(15)]
    [Unicode(false)]
    public string? MachineIpaddress { get; set; }

    [Column("firmware_version")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FirmwareVersion { get; set; }

    [Column("machine_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? MachineStatus { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }
}
