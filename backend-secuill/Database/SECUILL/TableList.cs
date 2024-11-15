using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("Table_List")]
public partial class TableList
{
    [Column("table_name")]
    [StringLength(128)]
    public string TableName { get; set; } = null!;
}
