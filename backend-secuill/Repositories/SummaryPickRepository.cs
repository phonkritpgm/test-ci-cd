using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.DashBoard;
using backend_secuill.Models.PickDrug;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data.SqlClient;
using Microsoft.Data.SqlClient;
using System.Data;
using backend_secuill.Database.SECUILL;
namespace backend_secuill.Repositories
{
    public class SummaryPickRepository:ISummaryPickRepository
    {
        private readonly SecuillV5TuContext _Dbcontext;
        IConfiguration config = new ConfigurationBuilder()
                       .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false).Build();
        public SummaryPickRepository(SecuillV5TuContext dbcontext)
        {
            _Dbcontext = dbcontext;
        }

        public async Task<List<responseQtyPerHourModel>> GetQtyPerHour(string prescriptionDate)
        {
            var objValueQtyPerHour = await _Dbcontext.TSummaryPickFreeOrders
                                                     .Select(x => new
                                                     {
                                                         drug_code = x.DrugCode,
                                                         pick_qty = x.PickQty,
                                                         pick_time = x.PickTime,
                                                         pick_date = x.PickDate
                                                     })
                                                 .Union(
                                                        _Dbcontext.TSummaryPickPrescriptions
                                                        .Select(x => new
                                                        {
                                                            drug_code = x.DrugCode,
                                                            pick_qty = x.PickQty,
                                                            pick_time = x.SumTime,
                                                            pick_date = x.SumDate
                                                        })
                                                     )
                                                     .Where(x => x.pick_date == prescriptionDate)
                                                     .GroupBy(x => new { drug_code = x.drug_code, pick_time = x.pick_time.Substring(0, 2) })
                                                     .Select(x => new
                                                     {
                                                         drug_code = x.Key.drug_code,
                                                         sum_pick = x.Sum(x => x.pick_qty),
                                                         pick_time = x.Key.pick_time
                                                     })
                                                     .OrderBy(x => x.drug_code)
                                                     .ToListAsync();

            List<responseQtyPerHourModel> res = new List<responseQtyPerHourModel>();

            string drugCode = "";
            foreach (var valueQtyPerHour in objValueQtyPerHour)
            {
                List<QtyPerHour> resQtyPerHour;    

                if (drugCode != valueQtyPerHour.drug_code)
                {
                    resQtyPerHour = new List<QtyPerHour>();
                    for (var i = 1 ; i <= 24 ; i++){          
                        var hour = i.ToString().PadLeft(2,'0');
                        var valueByDrug = objValueQtyPerHour.Where(x => x.drug_code == valueQtyPerHour.drug_code && x.pick_time == hour).FirstOrDefault();
                        if (valueByDrug != null) {
                            resQtyPerHour.Add(
                            new QtyPerHour
                            {
                                hour = hour,
                                qty = Convert.ToInt16(valueByDrug.sum_pick) 
                            });                   
                        }
                        else{
                            resQtyPerHour.Add(
                            new QtyPerHour
                            {
                                hour = hour,
                                qty = 0
                            });        
                        }
                    }
                    res.Add(
                        new responseQtyPerHourModel
                        {
                            drug_code = valueQtyPerHour.drug_code,
                            drug_name = await _Dbcontext.MDrugs.Where(x=>x.DrugCode == valueQtyPerHour.drug_code).Select(x=>x.DrugNameEn).FirstOrDefaultAsync() ,
                            QtyPerHour = resQtyPerHour
                        }
                    );
                    drugCode = valueQtyPerHour.drug_code;
                }
            }
            return res;
        }

        public async Task<List<resposePickPrescription>> resposePickPres(string startDate , string endDate)
        {
            List<resposePickPrescription> objPickPres = new List<resposePickPrescription>();
            string Query = $"select sum_id" +
                $",pres_no" +
                $",pick_qty" +
                $",sum_time" +
                $",user_id" +
                $",pres_orderacceptdate" +
                $",drugName" +
                $",pres_orderqty" +
                $",pres_orderaccepttime" +
                $",pick_no" +
                $",user_id2" +
                $",pat_hn" +
                $",pat_name" +
                $",ward_name" +
                $",pres_status" +
                $",pres_statusdesc" +
                $" from " +
                $" (select " +
                $" b.sum_id, " +
                $" a.pres_no, " +
                $" isnull(b.pick_qty, 0) as pick_qty, " +
                $" b.sum_time, " +
                $" b.user_id," +
                $" a.pres_orderacceptdate," +
                $" a.drug_name as drugName," +
                $" a.pres_orderqty," +
                $" a.pres_orderaccepttime," +
                $" b.pick_no," +
                $" c.user_id2," +
                $" a.pat_hn," +
                $" d.pat_name," +
                $" e.ward_name," +
                $" a.pres_status," +
                $" a.pres_statusdesc" +
                $" from T_Prescription a" +
                $" left join T_SummaryPickPrescription b" +
                $" on a.pres_no = b.pres_no and a.pres_seq = b.pres_seq" +
                $" left join T_DoubleLogin c" +
                $" on b.pick_no = c.proc_no" +
                $" inner join M_Patient d" +
                $" on a.pat_hn = d.pat_hn" +
                $" inner join M_Ward e" +
                $" on d.pat_wardcode = e.ward_code" +
                $" where(b.pres_no<> '' or a.pres_no<> '') and a.pres_orderacceptdate between '{startDate}' and '{endDate}'" +
                $" union " +
                $" select" +
                $" a.sum_id," +
                $" (select top 1 pres_no from T_SummaryPickPrescription sp where sp.pick_no = a.pick_no and isnull(sp.pres_no, '') <> '') as pres_no," +
                $" isnull(a.pick_qty, 0) as pick_qty," +
                $" a.sum_time," +
                $" a.user_id," +
                $" (select top 1 pres_orderacceptdate from T_Prescription p where p.pres_no = (select top 1 pres_no from T_SummaryPickPrescription sp where sp.pick_no = a.pick_no and isnull(sp.pres_no, '') <> '')) as pres_orderacceptdate," +
                $" b.drug_name_en as drugName," +
                $" 0 as pres_orderqty," +
                $" null as pres_orderaccepttime," +
                $" a.pick_no," +
                $" c.user_id2," +
                $" a.pat_hn," +
                $" d.pat_name," +
                $" e.ward_name," +
                $" a.pick_errorstatus as pres_status," +
                $" case when(a.pick_errorstatus<> '0') then 'หยิบยาผิด' else 'พร้อมจ่ายยา' end as pres_statusdesc " +
                $" from T_SummaryPickPrescription a" +
                $" inner join M_Drug b" +
                $" on a.drug_code = b.drug_code" +
                $" left join T_DoubleLogin c" +
                $" on a.pick_no = c.proc_no" +
                $" inner join M_Patient d" +
                $" on a.pat_hn = d.pat_hn" +
                $" inner join M_Ward e" +
                $" on d.pat_wardcode = e.ward_code" +
                $" where a.pres_no = '' and a.pres_date between '{startDate.Replace("-","")}'and '{endDate.Replace("-", "")}')result" +
                $" order by  pres_orderacceptdate,pres_no, (case when pres_orderaccepttime is null then '23:60' else pres_orderaccepttime end), sum_id asc;";
           
            SqlConnection connect = new SqlConnection(config.GetConnectionString("pathsql_secuill"));
            SqlDataAdapter da = new SqlDataAdapter(Query, connect);
            DataSet ds = new DataSet();
            try
            {
                da.Fill(ds,"tb1");
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            

           for (int i = 0; i <= ds.Tables["tb1"].Rows.Count - 1; i++)
            {
                List<UserPickModel> UserPickModel = new List<UserPickModel>();
                string UserID = ds.Tables["tb1"].Rows[i].Field<string>("user_id");
                if (UserID != "")
                {
                    var UserFullName = await _Dbcontext.MUsers.Where(x => x.UserId == UserID).Select(x => x.UserFullname).FirstOrDefaultAsync();
                    if (UserFullName != null)
                    {
                        UserPickModel.Add(
                            new UserPickModel
                            {
                                userPickName = UserFullName
                            }
                      );
                    }
                }

                string UserID_2 = ds.Tables["tb1"].Rows[i].Field<string>("user_id2");
                if (UserID_2 != "")
                {
                    var UserFullName2 = await _Dbcontext.MUsers.Where(x => x.UserId == UserID_2).Select(x => x.UserFullname).FirstOrDefaultAsync();
                    if (UserFullName2 != null)
                    {
                        UserPickModel.Add(
                            new UserPickModel
                            {
                                userPickName = UserFullName2
                            }
                        );
                    }
                }

                objPickPres.Add(
                new resposePickPrescription
                {
                    pres_orderacceptdate = ds.Tables["tb1"].Rows[i].Field<string>("pres_orderacceptdate"),
                    pres_no = ds.Tables["tb1"].Rows[i].Field<string>("pres_no"),
                    drug_name = ds.Tables["tb1"].Rows[i].Field<string>("drugName"),
                    pres_orderqty = (int)ds.Tables["tb1"].Rows[i].Field<decimal>("pres_orderqty"),
                    pres_orderaccepttime = ds.Tables["tb1"].Rows[i].Field<string>("pres_orderaccepttime"),
                    pick_qty = (int)ds.Tables["tb1"].Rows[i].Field<decimal>("pick_qty"),
                    pick_time = ds.Tables["tb1"].Rows[i].Field<string>("sum_time"),
                    hn = ds.Tables["tb1"].Rows[i].Field<string>("pat_hn"),
                    patient = ds.Tables["tb1"].Rows[i].Field<string>("pat_name"),
                    ward = ds.Tables["tb1"].Rows[i].Field<string>("ward_name"),
                    userPick = UserPickModel
                });
            }

            return objPickPres;
        } 

        public async Task<List<resposePickFreeOrderModel>> getDatePickFreeOrder(string startDate,string endDate) {
            var result = await (from a in _Dbcontext.TSummaryPickFreeOrders
                                join b in _Dbcontext.MDrugs on a.DrugCode equals b.DrugCode
                                join c in _Dbcontext.MPatients on a.PatHn equals c.PatHn
                                join d in _Dbcontext.MWards on c.PatWardcode equals d.WardCode
                                join e in _Dbcontext.TDoubleLogins on a.PickorderNo equals e.ProcNo into e
                                from dbl in e.DefaultIfEmpty()
                                where ((DateTime)(object)a.PickDate >= (DateTime)(object)startDate && (DateTime)(object)a.PickDate <= (DateTime)(object)endDate)
                                orderby (a.PickDate + a.PickTime)
                                select new
                                {
                                    a.PickDate,
                                    a.OrderNo,
                                    b.DrugNameEn,
                                    a.PickQty,
                                    a.PickTime,
                                    a.UserId,
                                    a.PatHn,
                                    c.PatName,
                                    c.PatWardcode,
                                    d.WardName,
                                    dbl.UserId2
                                }
                                )
                                .ToListAsync();
                                
            
            List <resposePickFreeOrderModel> PickFreeOrderModels = new List<resposePickFreeOrderModel>();
            foreach (var values in result){
                List<UserPickModel> UserPickModel = new List<UserPickModel>();
                if (values.UserId != null && values.UserId != "")
                {
                   var UserFullName =  await _Dbcontext.MUsers.Where(x => x.UserId == values.UserId).Select(x=>x.UserFullname).FirstOrDefaultAsync();
                    if (UserFullName != null){
                        UserPickModel.Add(
                        new UserPickModel{
                            userPickName = UserFullName
                        }
                      );        
                    }
                } 
               
                var user2 = values.UserId2;                 
                if (user2 != null && user2 != ""){
                    var UserFullName2 = await _Dbcontext.MUsers.Where(x => x.UserId == user2).Select(x=>x.UserFullname).FirstOrDefaultAsync();
                    if (UserFullName2 != null){
                        UserPickModel.Add(
                            new UserPickModel{
                                userPickName = UserFullName2
                            }
                        );
                    }                    
                }               


                PickFreeOrderModels.Add(
                    new resposePickFreeOrderModel{
                        drug_name = values.DrugNameEn,
                        order_no=values.OrderNo,
                        pick_date=values.PickDate,
                        pick_qty=(int)values.PickQty,
                        pick_time=values.PickTime,
                        hn = values.PatHn,
                        pat_name = values.PatName,
                        ward_name = values.WardName,
                        userPick= UserPickModel
                    }
                );
            }
              
            return PickFreeOrderModels;
        }

        public async Task<List<responseReportSummaryPickModel>> ResponseReportSummaryPick(string startDate , string endDate)
        {
            var result = await (from a in _Dbcontext.MDrugs  
                                orderby a.DrugNameEn ascending , a.DrugNameEn descending 
                                select new
                                {
                                    a.DrugCode,
                                    a.DrugNameEn,                                 
                                    a.DrugStatus
                                }
                                ).ToListAsync();
            
            List<responseReportSummaryPickModel> resLabelSumPick = new List<responseReportSummaryPickModel>();
            string DrugCd_Old = "";
           
            int No = 0;
            foreach(var model in result)
            {
                if (DrugCd_Old != model.DrugCode)
                {
                    No += 1;
                }
                var resFreeQty = _Dbcontext.TSummaryPickFreeOrders
                                  .Where(x => x.DrugCode == model.DrugCode && ((DateTime)(object)x.PickDate >= (DateTime)(object)startDate && (DateTime)(object)x.PickDate <= (DateTime)(object)endDate))
                                  .GroupBy(x => x.DrugCode)
                                  .Select(x => x.Sum(x => x.PickQty)).FirstOrDefault();
                var resVerQty = _Dbcontext.TSummaryPickPrescriptions
                                    .Where(x => x.DrugCode == model.DrugCode && ((DateTime)(object)x.SumDate >= (DateTime)(object)startDate && (DateTime)(object)x.SumDate <= (DateTime)(object)endDate))
                                    .GroupBy(x => x.DrugCode)
                                    .Select(x => x.Sum(x => x.PickQty)).FirstOrDefault();

               resLabelSumPick.Add(
                    new responseReportSummaryPickModel
                    {
                        no = No,
                        drugcode = model.DrugCode,
                        drugname = model.DrugNameEn,
                        freeqty = resFreeQty == null ? 0 : (int)resFreeQty,
                        varqty = resVerQty == null ? 0 : (int)resVerQty,
                        pickall = (resFreeQty == null ? 0 : (int)resFreeQty) + (resVerQty == null ? 0 : (int)resVerQty),
                        drugstatus = model.DrugStatus
                    }
                    );

                DrugCd_Old = model.DrugCode;
            }

            return resLabelSumPick;
        }
    }
}
