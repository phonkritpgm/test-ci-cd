using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Keyless]
[Table("Table_Columns")]
public partial class TableColumn
{
    [Column("TABLE_CATALOG")]
    [StringLength(128)]
    public string? TableCatalog { get; set; }

    [Column("TABLE_SCHEMA")]
    [StringLength(128)]
    public string? TableSchema { get; set; }

    [Column("TABLE_NAME")]
    [StringLength(128)]
    public string TableName { get; set; } = null!;

    [Column("COLUMN_NAME")]
    [StringLength(128)]
    public string? ColumnName { get; set; }

    [Column("ORDINAL_POSITION")]
    public int? OrdinalPosition { get; set; }

    [Column("COLUMN_DEFAULT")]
    [StringLength(4000)]
    public string? ColumnDefault { get; set; }

    [Column("IS_NULLABLE")]
    [StringLength(3)]
    [Unicode(false)]
    public string? IsNullable { get; set; }

    [Column("DATA_TYPE")]
    [StringLength(128)]
    public string? DataType { get; set; }

    [Column("CHARACTER_MAXIMUM_LENGTH")]
    public int? CharacterMaximumLength { get; set; }

    [Column("CHARACTER_OCTET_LENGTH")]
    public int? CharacterOctetLength { get; set; }

    [Column("NUMERIC_PRECISION")]
    public byte? NumericPrecision { get; set; }

    [Column("NUMERIC_PRECISION_RADIX")]
    public short? NumericPrecisionRadix { get; set; }

    [Column("NUMERIC_SCALE")]
    public int? NumericScale { get; set; }

    [Column("DATETIME_PRECISION")]
    public short? DatetimePrecision { get; set; }

    [Column("CHARACTER_SET_CATALOG")]
    [StringLength(128)]
    public string? CharacterSetCatalog { get; set; }

    [Column("CHARACTER_SET_SCHEMA")]
    [StringLength(128)]
    public string? CharacterSetSchema { get; set; }

    [Column("CHARACTER_SET_NAME")]
    [StringLength(128)]
    public string? CharacterSetName { get; set; }

    [Column("COLLATION_CATALOG")]
    [StringLength(128)]
    public string? CollationCatalog { get; set; }

    [Column("COLLATION_SCHEMA")]
    [StringLength(128)]
    public string? CollationSchema { get; set; }

    [Column("COLLATION_NAME")]
    [StringLength(128)]
    public string? CollationName { get; set; }

    [Column("DOMAIN_CATALOG")]
    [StringLength(128)]
    public string? DomainCatalog { get; set; }

    [Column("DOMAIN_SCHEMA")]
    [StringLength(128)]
    public string? DomainSchema { get; set; }

    [Column("DOMAIN_NAME")]
    [StringLength(128)]
    public string? DomainName { get; set; }
}
