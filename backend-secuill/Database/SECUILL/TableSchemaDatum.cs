using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("Table_SchemaData")]
public partial class TableSchemaDatum
{
    [Column("name")]
    [StringLength(128)]
    public string Name { get; set; } = null!;

    [Column("object_id")]
    public int ObjectId { get; set; }

    [Column("principal_id")]
    public int? PrincipalId { get; set; }

    [Column("schema_id")]
    public int SchemaId { get; set; }

    [Column("parent_object_id")]
    public int ParentObjectId { get; set; }

    [Column("type")]
    [StringLength(2)]
    [Unicode(false)]
    public string Type { get; set; } = null!;

    [Column("type_desc")]
    [StringLength(60)]
    public string? TypeDesc { get; set; }

    [Column("create_date", TypeName = "datetime")]
    public DateTime CreateDate { get; set; }

    [Column("modify_date", TypeName = "datetime")]
    public DateTime ModifyDate { get; set; }

    [Column("is_ms_shipped")]
    public bool IsMsShipped { get; set; }

    [Column("is_published")]
    public bool IsPublished { get; set; }

    [Column("is_schema_published")]
    public bool IsSchemaPublished { get; set; }

    [Column("lob_data_space_id")]
    public int LobDataSpaceId { get; set; }

    [Column("filestream_data_space_id")]
    public int? FilestreamDataSpaceId { get; set; }

    [Column("max_column_id_used")]
    public int MaxColumnIdUsed { get; set; }

    [Column("lock_on_bulk_load")]
    public bool LockOnBulkLoad { get; set; }

    [Column("uses_ansi_nulls")]
    public bool? UsesAnsiNulls { get; set; }

    [Column("is_replicated")]
    public bool? IsReplicated { get; set; }

    [Column("has_replication_filter")]
    public bool? HasReplicationFilter { get; set; }

    [Column("is_merge_published")]
    public bool? IsMergePublished { get; set; }

    [Column("is_sync_tran_subscribed")]
    public bool? IsSyncTranSubscribed { get; set; }

    [Column("has_unchecked_assembly_data")]
    public bool HasUncheckedAssemblyData { get; set; }

    [Column("text_in_row_limit")]
    public int? TextInRowLimit { get; set; }

    [Column("large_value_types_out_of_row")]
    public bool? LargeValueTypesOutOfRow { get; set; }

    [Column("is_tracked_by_cdc")]
    public bool? IsTrackedByCdc { get; set; }

    [Column("lock_escalation")]
    public byte? LockEscalation { get; set; }

    [Column("lock_escalation_desc")]
    [StringLength(60)]
    public string? LockEscalationDesc { get; set; }

    [Column("is_filetable")]
    public bool? IsFiletable { get; set; }
}
