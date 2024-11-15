
using backend_secuill.Database.SECUILL;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.Drugs;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill.Repositories
{
    public class DrugRepository : IDrugsRepository
    {
        private readonly SecuillV5TuContext _DbcontextSecuill;
        public DrugRepository(SecuillV5TuContext DbcontextSecuill)
        {
            _DbcontextSecuill = DbcontextSecuill;
        }
        public async Task<List<responseDrugModel>> getDrugMaster()
        {
            var result = await (from a in _DbcontextSecuill.MDrugs
                                join b in _DbcontextSecuill.TSummaryStocks on a.DrugCode equals b.DrugCode
                                join c in _DbcontextSecuill.MConvertDrugUnits on a.DrugCode equals c.DrugCode into c
                                from cu in c.DefaultIfEmpty()
                                select new
                                {
                                    a.DrugCode,
                                    a.DrugNameEn,
                                    b.StockQty,
                                    a.DrugUnit,
                                    b.StockMin,
                                    b.StockMax,
                                    a.DrugNarcotic,
                                    a.DrugAntibiotic,
                                    a.DrugHighalert,
                                    a.DrugStatus,
                                    a.DrugBarcode,
                                    a.DrugNameTh,
                                    cu.Unitqty,
                                    cu.Unitcode,
                                    cu.Convto,
                                    cu.Convtounitcode
                                }
                                )
                                .ToListAsync();        
            List<responseDrugModel> _responseDrugModels = new List<responseDrugModel>();
            foreach (var model in result) {
                _responseDrugModels.Add(
                    new responseDrugModel
                    {
                        drug_code = model.DrugCode,
                        drug_name_en = model.DrugNameEn ,
                        stock_qty = (int)model.StockQty,
                        drug_unit = model.DrugUnit,
                        stock_max = (int)model.StockMax,
                        stock_min = (int)model.StockMin,
                        drug_antibiotic = model.DrugAntibiotic,
                        drug_narcotic = model.DrugNarcotic,
                        drug_highalert = model.DrugHighalert,
                        drug_status = model.DrugStatus,
                        drug_barcode = model.DrugBarcode,
                        drug_name_th = model.DrugNameTh,
                        useConverUnit = model.Unitqty != null ? true : false,
                        unitqty = model.Unitqty,
                        unitcode = model.Unitcode,
                        convto = model.Convto,
                        convtounitcode = model.Convtounitcode                      
                    }
                );
            }
            return _responseDrugModels;
        }

        public async Task<string> UpdateDrug(string drug_code , bodyDrugEditModel bodyDrugModel)
        {
            try
            {
                MDrug resultDrug = await _DbcontextSecuill.MDrugs.SingleOrDefaultAsync(x => x.DrugCode == drug_code);
                if (resultDrug != null)
                {
                    resultDrug.DrugNameEn = bodyDrugModel.drug_name_en;
                    resultDrug.DrugNameTh = bodyDrugModel.drug_name_th;
                    resultDrug.DrugBarcode = bodyDrugModel.drug_barcode;
                    resultDrug.DrugUnit = bodyDrugModel.drug_unit;
                    resultDrug.DrugNarcotic = bodyDrugModel.drug_narcotic;
                    resultDrug.DrugAntibiotic = bodyDrugModel.drug_antibiotic;
                    resultDrug.DrugHighalert = bodyDrugModel.drug_highalert;
                    resultDrug.DrugStatus = bodyDrugModel.drug_status;

                    _DbcontextSecuill.MDrugs.Update(resultDrug);
                    await _DbcontextSecuill.SaveChangesAsync();
                    TSummaryStock resultStock = await _DbcontextSecuill.TSummaryStocks.SingleOrDefaultAsync(x => x.DrugCode == drug_code);
                    if (resultStock != null)
                    {
                        resultStock.StockMax = bodyDrugModel.stock_max;
                        resultStock.StockMin = bodyDrugModel.stock_min;
                        _DbcontextSecuill.TSummaryStocks.Update(resultStock);
                        await _DbcontextSecuill.SaveChangesAsync();
                    }

                    MConvertDrugUnit resConverUnit = await _DbcontextSecuill.MConvertDrugUnits.SingleOrDefaultAsync(x => x.DrugCode == drug_code);
                    if (bodyDrugModel.useConverUnit)
                    {
                        MConvertDrugUnit mConvertDrugUnit = new MConvertDrugUnit();
                        if (resConverUnit == null)
                        {
                            mConvertDrugUnit.DrugCode = drug_code;
                            mConvertDrugUnit.Unitqty = bodyDrugModel.Unitqty;
                            mConvertDrugUnit.Unitcode = bodyDrugModel.Unitcode;
                            mConvertDrugUnit.Convto = bodyDrugModel.Convto;
                            mConvertDrugUnit.Convtounitcode = bodyDrugModel.Convtounitcode;
                            _DbcontextSecuill.MConvertDrugUnits.Add(mConvertDrugUnit);
                            await _DbcontextSecuill.SaveChangesAsync();
                        }
                        else
                        {
                            resConverUnit.Unitqty = bodyDrugModel.Unitqty;
                            resConverUnit.Unitcode = bodyDrugModel.Unitcode;
                            resConverUnit.Convto = bodyDrugModel.Convto;
                            resConverUnit.Convtounitcode = bodyDrugModel.Convtounitcode;
                            _DbcontextSecuill.MConvertDrugUnits.Update(resConverUnit);
                            await _DbcontextSecuill.SaveChangesAsync();
                        }
                    }
                    else
                    {
                        if (resConverUnit != null)
                        {
                            _DbcontextSecuill.MConvertDrugUnits.Remove(resConverUnit);
                            await _DbcontextSecuill.SaveChangesAsync();
                        }
                    }


                    return "SUCCESS";
                }
                else
                {
                    return "NOTFOUND";
                }
            }
            catch (Exception ex) {
                return ex.Message;
            }      
        }

        public async Task<string> insertDrug(bodyDrugInsertModel bodyDrugInsertModel,string userUpdate)
        {
            try
            {

                try
                {
                    var result = await _DbcontextSecuill.MDrugs.SingleOrDefaultAsync(x => x.DrugCode == bodyDrugInsertModel.drug_code);
                    if (result != null)
                    {
                        return "Drug is already";
                    }
                    MDrug mDrug = new MDrug();
                    mDrug.DrugCode = bodyDrugInsertModel.drug_code;
                    mDrug.DrugBarcode = bodyDrugInsertModel.drug_barcode;
                    mDrug.DrugNameEn = bodyDrugInsertModel.drug_name_en;
                    mDrug.DrugNameTh = bodyDrugInsertModel.drug_name_th;
                    mDrug.DrugUnit = bodyDrugInsertModel.drug_unit;
                    mDrug.DrugDesc = bodyDrugInsertModel.drug_desc;
                    mDrug.DrugNarcotic = bodyDrugInsertModel.drug_narcotic;
                    mDrug.DrugHighalert = bodyDrugInsertModel.drug_highalert;
                    mDrug.DrugAntibiotic = bodyDrugInsertModel.drug_antibiotic;
                    mDrug.DrugStatus = bodyDrugInsertModel.drug_status;
                    mDrug.DrugUserupdate = userUpdate;
                    mDrug.Lastmodified = DateTime.Now;
                    _DbcontextSecuill.MDrugs.Add(mDrug);
                    await _DbcontextSecuill.SaveChangesAsync();
                    try
                    {
                        TSummaryStock summaryStock = new TSummaryStock();
                        summaryStock.StockRunid = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                        summaryStock.DrugCode = bodyDrugInsertModel.drug_code;
                        summaryStock.StockQty = bodyDrugInsertModel.stock_qty;
                        summaryStock.StockMin = bodyDrugInsertModel.stock_min;
                        summaryStock.StockMax = bodyDrugInsertModel.stock_max;
                        summaryStock.StockDate = DateTime.Now.ToString("yyyy-MM-dd");
                        summaryStock.StockTime = DateTime.Now.ToString("HH:mm");
                        _DbcontextSecuill.TSummaryStocks.Add(summaryStock);
                        await _DbcontextSecuill.SaveChangesAsync();

                        MConvertDrugUnit resConverUnit = await _DbcontextSecuill.MConvertDrugUnits.SingleOrDefaultAsync(x=>x.DrugCode == bodyDrugInsertModel.drug_code);
                        MConvertDrugUnit mConvertDrugUnit = new MConvertDrugUnit();
                        if (resConverUnit == null)
                        {                          
                            mConvertDrugUnit.DrugCode = bodyDrugInsertModel.drug_code;
                            mConvertDrugUnit.Unitqty = bodyDrugInsertModel.Unitqty;
                            mConvertDrugUnit.Unitcode = bodyDrugInsertModel.Unitcode;
                            mConvertDrugUnit.Convto = bodyDrugInsertModel.Convto;
                            mConvertDrugUnit.Convtounitcode = bodyDrugInsertModel.Convtounitcode;
                            _DbcontextSecuill.MConvertDrugUnits.Add(mConvertDrugUnit);
                            await _DbcontextSecuill.SaveChangesAsync();
                        }
                        else
                        {
                            resConverUnit.Unitqty = bodyDrugInsertModel.Unitqty;
                            resConverUnit.Unitcode = bodyDrugInsertModel.Unitcode;
                            resConverUnit.Convto = bodyDrugInsertModel.Convto;
                            resConverUnit.Convtounitcode = bodyDrugInsertModel.Convtounitcode;
                            _DbcontextSecuill.MConvertDrugUnits.Update(resConverUnit);
                            await _DbcontextSecuill.SaveChangesAsync();
                        }
                       
                        return "SUCCESS";
                    }
                    catch (Exception ex)
                    {
                        return ex.Message;
                    }


                }
                catch (Exception ex)
                {
                    return ex.Message;
                }       
               
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            
        }

        public async Task<List<responseDrugLotModel>> ResponseDrugLotModels()
        {
            var res = await _DbcontextSecuill.MDrugs
                .Select(x => new
                {
                    x.DrugCode,
                    x.DrugNameEn,
                    CountLot = _DbcontextSecuill.MDrugLotNumbers.Where(y => y.DrugCode == x.DrugCode && y.LotStatus == "1").Count(),
                    x.DrugStatus
                })
                .Where(x => x.DrugStatus == "1")
                .ToListAsync();

            List<responseDrugLotModel> responseDrugLotModels = new List<responseDrugLotModel>();
            foreach (var r in res)
            {
                responseDrugLotModels.Add(
                    new responseDrugLotModel
                    {
                        drugCode = r.DrugCode,
                        drugName = r.DrugNameEn,
                        countLot = r.CountLot
                    }
                    );
            }

            return responseDrugLotModels;
        }

        public async Task<responseConvertUnit> ResponseConvertUnit(string drugCode)
        {
            var result = await (from a in _DbcontextSecuill.MConvertDrugUnits
                                where a.DrugCode == drugCode
                                select new
                                {
                                    a.Unitqty,
                                    a.Unitcode,
                                    a.Convto,
                                    a.Convtounitcode,
                                })
                                .FirstOrDefaultAsync();
            responseConvertUnit responseConvertUnit = null; 
            if (result != null)
            {
                responseConvertUnit = new responseConvertUnit
                {
                    unitqty = result.Unitqty,
                    unitcode = result.Unitcode,
                    convto  = result.Convto,
                    convtounitcode = result.Convtounitcode
                };
            }
            return responseConvertUnit;
        }

        public async Task<string> insertConvertDrugUnit(bodyInsertConvertDrugUnit bodyInsertConvertEditDrug)
        {
            MConvertDrugUnit mConvertDrugUnit = new MConvertDrugUnit()
            {
                DrugCode = bodyInsertConvertEditDrug.drug_code,
                Unitqty = bodyInsertConvertEditDrug.unitqty,
                Unitcode = bodyInsertConvertEditDrug.unitcode,
                Convto = bodyInsertConvertEditDrug.convto,
                Convtounitcode = bodyInsertConvertEditDrug.convtounitcode
            };
            try
            {
                _DbcontextSecuill.MConvertDrugUnits.Add(mConvertDrugUnit);
                await _DbcontextSecuill.SaveChangesAsync();
                return "SUCCESS";
            }
            catch(Exception ex)
            {
                return ex.ToString();
            }         
        }

        public async Task<string> updateConvertDrugUnit(string drugCode,bodyUpdateConvertDrugUnit bodyUpdateConvertDrugUnit)
        {
            MConvertDrugUnit? mConvertDrugUnit = await _DbcontextSecuill.MConvertDrugUnits.SingleOrDefaultAsync(x=>x.DrugCode == drugCode);
            if (mConvertDrugUnit != null)
            {
                mConvertDrugUnit.Unitqty = bodyUpdateConvertDrugUnit.unitqty;
                mConvertDrugUnit.Unitcode= bodyUpdateConvertDrugUnit.unitcode;
                mConvertDrugUnit.Convto = bodyUpdateConvertDrugUnit.convto;
                mConvertDrugUnit.Convtounitcode =bodyUpdateConvertDrugUnit.convtounitcode;
                try
                {
                    _DbcontextSecuill.MConvertDrugUnits.Update(mConvertDrugUnit);
                    await _DbcontextSecuill.SaveChangesAsync();
                    return "SUCCESS";
                }
                catch(Exception ex) {
                    return ex.ToString();   
                }             
            }
            else
            {
                return "NOTFOUND";
            }
        }
    }
}
