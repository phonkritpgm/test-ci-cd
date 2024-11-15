using backend_secuill.Database;
using backend_secuill.Database.SECUILL;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.DashBoard;
using backend_secuill.Models.Stock;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace backend_secuill.Repositories
{
    public class StockRepository: IStockRepository
    {
        private readonly SecuillV5TuContext _DbContext;

        public StockRepository(SecuillV5TuContext dbcontext) 
        {
            _DbContext = dbcontext;
        }
        public async Task<List<responseHeaderHistoryRefillModel>> GetHeaderRefill(string startDate)
        {
            var objRefill = await _DbContext.TDrugRefills
                .Where(x =>EF.Functions.DateDiffDay((DateTime)(object)x.RefillDate, (DateTime)(object)startDate) >= 0
                          && EF.Functions.DateDiffDay((DateTime)(object)x.RefillDate, (DateTime)(object)startDate) <= 5)
                .GroupBy(x => new { refilldate = x.RefillDate, refillTime = x.RefillTime.Substring(0,2) })
                .Select(x => new { refillDate = (DateTime)(object)x.Key.refilldate, refillTime = x.Key.refillTime})
                .OrderBy(x => x.refillDate)
                .ToListAsync();
            List<responseHeaderHistoryRefillModel> resHeaderRefill = new List<responseHeaderHistoryRefillModel>();
            string RefillDate = "";
            foreach (var v in objRefill)
            {
                if (RefillDate !=Convert.ToString(v.refillDate))
                {
                    List<refillHour> refillHour = new List<refillHour>();
                    var x = objRefill.Where(x => x.refillDate == v.refillDate);
                    foreach (var vd in x)
                    {
                        refillHour.Add(new refillHour { hour = vd.refillTime + ":00" });
                    }
                    resHeaderRefill.Add(
                        new responseHeaderHistoryRefillModel
                        {
                            refillDate = Convert.ToString(v.refillDate.ToString("yyyy-MM-dd")),
                            refillHours = refillHour
                        });
                    RefillDate = Convert.ToString(v.refillDate);
                }
            }
            return resHeaderRefill;
        }


        public async Task<List<responseDrugRefillModel>> GetDrugRefill(string refillDate ,string refillTime)
        {
            List<responseDrugRefillModel> DrugRefill = new List<responseDrugRefillModel>();
            var  resDrugFill =  await _DbContext.TDrugRefills
                .Join(_DbContext.MDrugs,
                        r => r.DrugCode,
                        d => d.DrugCode,
                        (r, d) => new
                        {
                            drugName = d.DrugNameEn,
                            refillQty = r.RefillQty,
                            refillDate = r.RefillDate,
                            refillTime = r.RefillTime
                        }
                )
                .Where(r => r.refillDate == refillDate && r.refillTime.Substring(0, 2) == refillTime.Substring(0, 2))
                .GroupBy(x => new { drugName = x.drugName })
                .Select(x => new { DrugName = x.Key.drugName, RefillQty = x.Sum(x=>x.refillQty)})
                .ToListAsync();
            
            foreach (var v in resDrugFill)
            {
                DrugRefill.Add(
                    new responseDrugRefillModel { 
                        drugName= v.DrugName,
                        refillQty = (int)(v.RefillQty)
                    }
                );
            }
            return DrugRefill;
        }

        public async Task<List<resposeRefillModel>> ResposeRefillModel(string startDate,string endDate) {
            var result = await (from a in _DbContext.TSummaryDrugRefills
                                join b in _DbContext.MDrugs on a.DrugCode equals b.DrugCode
                                join c in _DbContext.TDoubleLogins on a.RefillNo equals c.ProcNo into c
                                from lb in c.DefaultIfEmpty()
                                where (DateTime)(object)a.RefillDate >= (DateTime)(object)startDate && (DateTime)(object)a.RefillDate <= (DateTime)(object)endDate
                                orderby a.RefillDate
                                select new
                                {
                                    a.RefillDate,
                                    a.DrugCode,
                                    b.DrugNameEn,
                                    a.RefillQty,
                                    a.LotNo,
                                    a.RefillTime,
                                    a.UserId,
                                    lb.UserId2,
                                    a.RefillCounter
                                }
                                 )
                                 .ToListAsync();
           
            List<resposeRefillModel> resposeRefillModels = new List<resposeRefillModel>();

            foreach (var values in result) {
                List<UserPickModel> userModel = new List<UserPickModel>();
                if (values.UserId != null && values.UserId != "")
                {
                    var UserFullName =  await _DbContext.MUsers.Where(x => x.UserId ==values.UserId).Select(x=>x.UserFullname).FirstOrDefaultAsync();
                    if (UserFullName != null){
                        userModel.Add(
                            new UserPickModel{
                                userPickName = UserFullName
                            }
                      );    
                    }                  
                } 
                    
                var user2 = values.UserId2;
                if (user2 != null && user2 != ""){
                    var UserFullName2 = await _DbContext.MUsers.Where(x => x.UserId == user2).Select(x=>x.UserFullname).FirstOrDefaultAsync();
                    if (UserFullName2 != null){
                         userModel.Add(
                            new UserPickModel{
                                userPickName = UserFullName2
                            }
                        );
                    }
                   
                }                            
                resposeRefillModels.Add(
                    new resposeRefillModel{
                        refill_date = values.RefillDate,
                        drug_code = values.DrugCode,
                        drug_name_en = values.DrugNameEn,
                        refill_qty = (int)values.RefillQty,
                        lot_no = values.LotNo,
                        refill_time = values.RefillTime,
                        userRefill  = userModel,
                        refill_counter = values.RefillCounter == null ? 0 : (int)values.RefillCounter
                    }
                );
            }
            return resposeRefillModels;
        }

        public async Task<List<responseStockModel>> ResponseStock() {
            var result = await (from a in _DbContext.TSummaryStocks
                                join b in _DbContext.MDrugs on a.DrugCode equals b.DrugCode
                                join c in _DbContext.MSlots on a.DrugCode equals c.DrugCode into c
                                from sl in c.DefaultIfEmpty()
                                join d in _DbContext.MShelf on sl.ShelfNo equals d.ShelfNo into d
                                from s in d.DefaultIfEmpty()
                                where (b.DrugStatus == "1")
                                orderby b.DrugNameEn
                                select new
                                {
                                    a.DrugCode,
                                    b.DrugNameEn,
                                    a.StockQty,
                                    a.StockMin,
                                    a.StockMax,
                                    b.DrugStatus,
                                    s.ShelfSafebox,
                                    s.ShelfRefrigeretor
                                }
                                )
                                .ToListAsync();

            List<responseStockModel> responseStockModels = new List<responseStockModel>();
            foreach (var value in result){
                responseStockModels.Add(
                    new responseStockModel{
                        drug_code=value.DrugCode,
                        drug_name=value.DrugNameEn,
                        stock_qty=(int)value.StockQty,
                        stock_min=(int)value.StockMin,
                        stock_max=(int)value.StockMax,
                        shelf_safebox = value.ShelfSafebox,
                        shelf_refrigeretor = value.ShelfRefrigeretor
                    }
                );
            }    
            return responseStockModels;
        }

        public async Task<List<responseReportRefillModel>> ResponseDrugRefillReport()
        {
            var result = await (from a in _DbContext.TSummaryStocks
                                join b in _DbContext.MDrugs on a.DrugCode equals b.DrugCode
                                join c in _DbContext.MDrugLotNumbers on a.DrugCode equals c.DrugCode into c
                                from dl in c.DefaultIfEmpty()
                                orderby b.DrugNameEn
                                select new
                                {
                                    a.DrugCode,
                                    b.DrugNameEn,
                                    a.StockMin,
                                    a.StockMax,
                                    a.StockQty,
                                    Diff = (a.StockMax - a.StockQty),
                                    dl.LotNo
                                }
                                )
                                .ToListAsync();
           
            List<responseReportRefillModel> responseLabelRefillModels = new List<responseReportRefillModel>();
            string DrugCd_Old = "";
            int No = 0;
            foreach( var model in result)
            {
                if (DrugCd_Old != model.DrugCode)
                {
                    No += 1;
                }
                responseLabelRefillModels.Add(
                    new responseReportRefillModel
                    {
                        no = No,
                        drugCode = model.DrugCode,
                        drugName = model.DrugNameEn,
                        max = (int)model.StockMax,
                        min = (int)model.StockMin,
                        qty = (int)model.StockQty,
                        diff = (int)model.Diff,
                        lotExp = model.LotNo,
                        note = ""
                    }
                );
                DrugCd_Old = model.DrugCode;
            }

            return responseLabelRefillModels;
        }

        public async Task<List<responseReportDrugExp>> ResposneReportDrugExp()
        {
            var result = await _DbContext.MDrugLotNumbers
                .Join(_DbContext.MDrugs,
                l => l.DrugCode,
                d => d.DrugCode,
                (l, d) => new
                    {
                        l.DrugCode,
                        d.DrugNameEn,
                        l.LotNo,
                        l.LotBbe,
                        l.LotQty,
                        l.LotMaxqty,
                        d.DrugStatus,
                        l.LotStatus
                    }
                )
                .Where(x => x.DrugStatus == "1")
                .OrderBy(x => x.DrugNameEn)
                .ToListAsync();

            List<responseReportDrugExp> responseStockModels = new List<responseReportDrugExp>();
            foreach (var model in result)
            {
                responseStockModels.Add(
                    new responseReportDrugExp
                    {
                        drugcode = model.DrugCode,
                        drugname = model.DrugNameEn,
                        lot_no = model.LotNo,
                        lot_exp_calc = model.LotBbe,
                        lot_qty = (int)model.LotQty,
                        lot_maxqty = (int)model.LotMaxqty
                    });
            }

            return responseStockModels;

        }

        public async Task<List<responseLotNumber>> ResponseLotNumbers(string drugCode)
        {
            var res = await _DbContext.MDrugLotNumbers
                .Join(_DbContext.MDrugs,
                l => l.DrugCode,
                d => d.DrugCode,
                (l, d) => new
                {
                    l.DrugCode,
                    l.LotNo,
                    d.DrugNameEn,
                    l.LotQty,
                    l.LotMaxqty,
                    l.LotExp,
                    l.LotBbe,
                    l.LotStatus,
                    l.LotCreatedate,
                })
                .Where(x=>x.DrugCode == drugCode)           
                .OrderBy(x => x.LotCreatedate)
                .OrderByDescending(x => x.LotStatus)
                .ToListAsync();

            List<responseLotNumber> responseLotNumbers = new List<responseLotNumber>();
            foreach (var r in res) {
                responseLotNumbers.Add(
                    new responseLotNumber
                    {
                        drugcode = r.DrugCode,
                        drugname = r.DrugNameEn,
                        lotno = r.LotNo,
                        lotbbe = r.LotBbe,
                        lotexp = r.LotExp,
                        lotmaxqty = (int)r.LotMaxqty,
                        lotqty = (int)r.LotQty,
                        lotstatus = r.LotStatus,
                    }
                );
            }

            return responseLotNumbers;
        }

        public async Task<string> insertLotNumber(bodyInsertLotNumber bodyInsertLotNumber,string userID)
        {
            var checkData = await _DbContext.MDrugLotNumbers
                .SingleOrDefaultAsync(x => x.DrugCode == bodyInsertLotNumber.drugcode 
                                    && x.LotNo == bodyInsertLotNumber.lotno 
                                    && x.LotStatus == "1");
           if (checkData != null)
            {
                return "LotNumber is already";
            }
            MDrugLotNumber mDrugLotNumber = new MDrugLotNumber();
            mDrugLotNumber.DrugCode = bodyInsertLotNumber.drugcode;
            mDrugLotNumber.LotNo = bodyInsertLotNumber.lotno;
            mDrugLotNumber.LotMfgdate = DateTime.Now;
            mDrugLotNumber.LotBbe = bodyInsertLotNumber.lotbbe;
            mDrugLotNumber.LotExp = bodyInsertLotNumber.lotexp;
            mDrugLotNumber.LotQty = bodyInsertLotNumber.lotqty;
            mDrugLotNumber.LotMaxqty = bodyInsertLotNumber.lotmaxqty;
            mDrugLotNumber.LotStatus = "1";
            mDrugLotNumber.LotCreatedate = DateTime.Now.ToString("yyyy-MM-dd");
            mDrugLotNumber.LotCreatetime = DateTime.Now.ToString("HH:mm");
            mDrugLotNumber.LotUsercreate = userID;
            try
            {
                await _DbContext.MDrugLotNumbers.AddAsync(mDrugLotNumber);
                await _DbContext.SaveChangesAsync();
                return "SUCCESS";
            }
            catch(Exception ex)
            {
                return ex.ToString();
            }
        }

        public async Task<string> updateLotNumber(bodyUpdateLotNumber bodyUpdateLotNumber,string drugCode, string Lotno, string userID)
        {
            MDrugLotNumber mDrugLotNo = await _DbContext.MDrugLotNumbers.SingleOrDefaultAsync(x => x.DrugCode == drugCode && x.LotNo == Lotno);
            if (mDrugLotNo != null)
            {
                mDrugLotNo.LotBbe = bodyUpdateLotNumber.lotbbe;
                mDrugLotNo.LotExp = bodyUpdateLotNumber.lotexp;
                mDrugLotNo.LotQty = bodyUpdateLotNumber.lotqty;
                mDrugLotNo.LotMaxqty = bodyUpdateLotNumber.lotmaxqty;
                mDrugLotNo.LotUserupdate = userID;
                mDrugLotNo.LotUpdatedate = DateTime.Now.ToString("yyyy-MM-dd");
                mDrugLotNo.LotUpdatetime = DateTime.Now.ToString("HH:mm");
                mDrugLotNo.LotMfgdate = DateTime.Now;
                _DbContext.MDrugLotNumbers.Update(mDrugLotNo);  
                await _DbContext.SaveChangesAsync();
                return "SUCCESS";
            }
            else
            {
                return "NOTFOUND";
            }
            
        }

        public async Task<string> updateStatusLotNumber(bodyUpdateStatusLotModel bodyUpdateStatusLotModel,string drugCode, string LotNo, string UserID)
        {
            MDrugLotNumber mDrugLotNo = await _DbContext.MDrugLotNumbers.SingleOrDefaultAsync(x => x.DrugCode == drugCode && x.LotNo == LotNo);
            if (mDrugLotNo != null)
            {
                mDrugLotNo.LotStatus = bodyUpdateStatusLotModel.lotstatus;
                mDrugLotNo.LotUpdatedate = DateTime.Now.ToString("yyyy-MM-dd");
                mDrugLotNo.LotUpdatetime = DateTime.Now.ToString("HH:mm");
                mDrugLotNo.LotUserupdate = UserID;
                mDrugLotNo.LotMfgdate = DateTime.Now;
                _DbContext.MDrugLotNumbers.Update(mDrugLotNo);
                await _DbContext.SaveChangesAsync();
                return "SUCCESS";
            }
            else
            {
                return "NOTFOUND";
            }
        }
    }
}
