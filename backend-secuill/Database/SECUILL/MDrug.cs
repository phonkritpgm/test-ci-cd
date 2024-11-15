using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace  backend_secuill.Database.SECUILL;

[Table("M_Drug")]
[Index("DrugCode", Name = "IX_Drug_code")]
public partial class MDrug
{
    [Key]
    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DrugCode { get; set; } = null!;

    [Column("drug_barcode")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugBarcode { get; set; }

    [Column("drug_barcode1")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugBarcode1 { get; set; }

    [Column("drug_code_ref1")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCodeRef1 { get; set; }

    [Column("drug_code_ref2")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugCodeRef2 { get; set; }

    [Column("drug_name_en")]
    [StringLength(200)]
    [Unicode(false)]
    public string? DrugNameEn { get; set; }

    [Column("drug_name_th")]
    [StringLength(50)]
    [Unicode(false)]
    public string? DrugNameTh { get; set; }

    [Column("drug_trade_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string? DrugTradeName { get; set; }

    [Column("drug_common_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string? DrugCommonName { get; set; }

    [Column("drug_account")]
    [StringLength(50)]
    [Unicode(false)]
    public string? DrugAccount { get; set; }

    [Column("drug_volume", TypeName = "decimal(4, 2)")]
    public decimal? DrugVolume { get; set; }

    [Column("drug_dosage", TypeName = "decimal(4, 2)")]
    public decimal? DrugDosage { get; set; }

    [Column("drug_unit")]
    [StringLength(10)]
    [Unicode(false)]
    public string? DrugUnit { get; set; }

    [Column("drug_usage")]
    [StringLength(150)]
    [Unicode(false)]
    public string? DrugUsage { get; set; }

    [Column("drug_desc")]
    [StringLength(100)]
    [Unicode(false)]
    public string? DrugDesc { get; set; }

    [Column("drug_indications")]
    [StringLength(100)]
    [Unicode(false)]
    public string? DrugIndications { get; set; }

    [Column("drug_interaction")]
    [StringLength(100)]
    [Unicode(false)]
    public string? DrugInteraction { get; set; }

    [Column("drug_warning")]
    [StringLength(100)]
    [Unicode(false)]
    public string? DrugWarning { get; set; }

    [Column("drug_characteristics")]
    [StringLength(10)]
    [Unicode(false)]
    public string? DrugCharacteristics { get; set; }

    [Column("drug_formats")]
    [StringLength(30)]
    [Unicode(false)]
    public string? DrugFormats { get; set; }

    [Column("drug_formats_th")]
    [StringLength(30)]
    [Unicode(false)]
    public string? DrugFormatsTh { get; set; }

    [Column("drug_category")]
    [StringLength(30)]
    [Unicode(false)]
    public string? DrugCategory { get; set; }

    [Column("drug_narcotic")]
    [StringLength(1)]
    [Unicode(false)]
    public string? DrugNarcotic { get; set; }

    [Column("drug_highalert")]
    [StringLength(1)]
    [Unicode(false)]
    public string? DrugHighalert { get; set; }

    [Column("drug_antibiotic")]
    [StringLength(1)]
    [Unicode(false)]
    public string? DrugAntibiotic { get; set; }

    [Column("drug_color")]
    [StringLength(10)]
    [Unicode(false)]
    public string? DrugColor { get; set; }

    [Column("drug_size_width", TypeName = "decimal(4, 2)")]
    public decimal? DrugSizeWidth { get; set; }

    [Column("drug_size_height", TypeName = "decimal(4, 2)")]
    public decimal? DrugSizeHeight { get; set; }

    [Column("drug_size_unitofmeasure")]
    [StringLength(10)]
    [Unicode(false)]
    public string? DrugSizeUnitofmeasure { get; set; }

    [Column("drug_size_desc")]
    [StringLength(30)]
    [Unicode(false)]
    public string? DrugSizeDesc { get; set; }

    [Column("drug_weight", TypeName = "decimal(4, 2)")]
    public decimal? DrugWeight { get; set; }

    [Column("drug_unitofweight")]
    [StringLength(10)]
    [Unicode(false)]
    public string? DrugUnitofweight { get; set; }

    [Column("drug_Imagpath")]
    [StringLength(15)]
    [Unicode(false)]
    public string? DrugImagpath { get; set; }

    [Column("drug_Imagbinary", TypeName = "image")]
    public byte[]? DrugImagbinary { get; set; }

    [Column("drug_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? DrugStatus { get; set; }

    [Column("drug_calculate")]
    [StringLength(2)]
    [Unicode(false)]
    public string? DrugCalculate { get; set; }

    [Column("drug_userupdate")]
    [StringLength(50)]
    [Unicode(false)]
    public string? DrugUserupdate { get; set; }

    [Column("lastmodified", TypeName = "datetime")]
    public DateTime? Lastmodified { get; set; }

    [Column("display_drugname")]
    [StringLength(100)]
    [Unicode(false)]
    public string? DisplayDrugname { get; set; }
}
