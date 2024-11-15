using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill.Database.SECUILL;

[Table("M_DrugLotNumber")]
public partial class MDrugLotNumber
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("lot_no")]
    [StringLength(30)]
    [Unicode(false)]
    public string LotNo { get; set; } = null!;

    [Column("drug_code")]
    [StringLength(15)]
    [Unicode(false)]
    public string DrugCode { get; set; } = null!;

    [Column("lot_manufacturers_name")]
    [StringLength(100)]
    [Unicode(false)]
    public string? LotManufacturersName { get; set; }

    [Column("lot_manufacturers_address")]
    [StringLength(100)]
    [Unicode(false)]
    public string? LotManufacturersAddress { get; set; }

    [Column("lot_regno")]
    [StringLength(20)]
    [Unicode(false)]
    public string? LotRegno { get; set; }

    [Column("lot_mfgdate", TypeName = "datetime")]
    public DateTime? LotMfgdate { get; set; }

    [Column("lot_bbe", TypeName = "datetime")]
    public DateTime? LotBbe { get; set; }

    [Column("lot_exp", TypeName = "datetime")]
    public DateTime LotExp { get; set; }

    [Column("lot_qty", TypeName = "decimal(6, 2)")]
    public decimal? LotQty { get; set; }

    [Column("lot_maxqty", TypeName = "decimal(6, 2)")]
    public decimal? LotMaxqty { get; set; }

    [Column("lot_status")]
    [StringLength(1)]
    [Unicode(false)]
    public string? LotStatus { get; set; }

    [Column("lot_comment")]
    [StringLength(200)]
    [Unicode(false)]
    public string? LotComment { get; set; }

    [Column("lot_usercreate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? LotUsercreate { get; set; }

    [Column("lot_createdate")]
    [StringLength(10)]
    [Unicode(false)]
    public string LotCreatedate { get; set; } = null!;

    [Column("lot_createtime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? LotCreatetime { get; set; }

    [Column("lot_userupdate")]
    [StringLength(20)]
    [Unicode(false)]
    public string? LotUserupdate { get; set; }

    [Column("lot_updatedate")]
    [StringLength(10)]
    [Unicode(false)]
    public string? LotUpdatedate { get; set; }

    [Column("lot_updatetime")]
    [StringLength(5)]
    [Unicode(false)]
    public string? LotUpdatetime { get; set; }
}
