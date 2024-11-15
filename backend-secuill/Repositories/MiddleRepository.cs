using System.Collections;
using System.Diagnostics;
using System.Numerics;
using System.Runtime.CompilerServices;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.Middle;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend_secuill.Repositories
{
    public class MiddleRepository : IMiddleRepository
    {
        private readonly ConhisMiddleV4UbchContext _DbcontextMiddle;
        private readonly SecuillV5TuContext _DbcontextSecuill;

        public MiddleRepository(ConhisMiddleV4UbchContext dbcontext , SecuillV5TuContext secuillV5TuContext)
        {
            _DbcontextMiddle = dbcontext;
            _DbcontextSecuill = secuillV5TuContext;
        }

        public async Task<List<resposePrescriptionToVerifyModel>> getPrescriptionToVerify(string presDate)
        {
            var objDrugMasterSecuill = await _DbcontextSecuill.MDrugs.Select(x=>new {x.DrugCode}).ToListAsync();
            ArrayList arr_drug = new ArrayList();
            foreach (var item in objDrugMasterSecuill)
            {
                arr_drug.Add(item.DrugCode);
            }
            var objPrescription = await (from a in _DbcontextMiddle.TbThaneshospMiddles
                                         where arr_drug.Contains(a.FOrderitemcode) && EF.Functions.DateDiffHour(a.FOrdercreatedate, DateTime.Now) < 24
                                         orderby a.f_dispense_secuill_time ascending, a.FOrdercreatedate descending
                                         select new {
                                             f_tomachineno = a.FTomachineno,
                                             f_prescriptionno = a.FPrescriptionno,
                                             f_prescriptiondate = a.FPrescriptiondate,
                                             f_hn = a.FHn,
                                             f_warddesc = a.FWarddesc,
                                             f_orderitemname = a.FOrderitemname,
                                             f_orderitemcode = a.FOrderitemcode,
                                             f_orderqty = a.FOrderqty,
                                             f_orderunitcode = a.FOrderunitcode,
                                             f_frequencydesc = a.FFrequencydesc,
                                             f_orderacceptdate = a.FOrderacceptdate,
                                             f_patientname = a.FPatientname,
                                             f_status = a.FStatus,
                                             f_offdate = a.FOffdatetime,
                                             RowID = a.RowId,
                                             f_seq = a.FSeq
                                         }
                                         )
                                         .ToListAsync();
           
            List<resposePrescriptionToVerifyModel> prescriptionToVerifyModels = new List<resposePrescriptionToVerifyModel>();
            foreach (var value in objPrescription)
            {
                var res = await _DbcontextSecuill.TPrescriptions
                   .Select(x => new
                   {
                       x.PresRunningno,
                       x.PresStatus,
                       x.PresStatusdesc,
                       x.PresDispensedstatus,
                       x.PresDispenseddesc,
                       x.PresNo,
                       x.PresSeq
                   })
                   .SingleOrDefaultAsync(x => x.PresNo == value.f_prescriptionno && x.PresSeq == value.f_seq);
                prescriptionToVerifyModels.Add(new resposePrescriptionToVerifyModel
                    {
                        f_tomachineno =Convert.ToString(value.f_tomachineno),
                        f_prescriptionno = value.f_prescriptionno,
                        f_prescriptiondate = value.f_prescriptiondate,
                        f_hn = value.f_hn,
                        f_warddesc = value.f_warddesc,
                        f_orderitemname = value.f_orderitemname,
                        f_orderitemcode=value.f_orderitemcode,
                        f_orderqty=value.f_orderqty,
                        f_orderunitcode = value.f_orderunitcode,
                        f_frequencydesc = value.f_frequencydesc,
                        f_orderacceptdate =value.f_orderacceptdate,
                        f_patientname= value.f_patientname,
                        f_status = (int)value.f_status,
                        f_offdate = value.f_offdate,
                        RowID=value.RowID,
                        pres_status = res == null ? "" : res.PresStatus,
                        pres_statusdesc = res == null ? "" : res.PresStatusdesc,
                        pres_dispensedstatus = res == null ? "" : res.PresDispensedstatus,
                        pres_dispenseddesc = res == null ? "" : res.PresDispenseddesc,
                        pres_runningno = res == null ? 0 : res.PresRunningno

                        // stock of drug
                        // count drug in prescription
                });           
            }

            return prescriptionToVerifyModels;
        }

        public async Task<string> updateStatusVerify(string RowID, int tomachineno , string FullName)
        {   try
            {
                var result = await _DbcontextMiddle.TbThaneshospMiddles.SingleOrDefaultAsync(x => x.RowId == RowID && x.FTomachineno == 0);
                if (result != null)
                {
                    result.FTomachineno = tomachineno;
                    result.f_dispense_secuill_by = FullName;
                    result.f_dispense_secuill_time = DateTime.Now;
                    _DbcontextMiddle.Update(result);
                    await _DbcontextMiddle.SaveChangesAsync();
                    return "SUCCESS";
                }
                else
                {
                    return "NOTFOUND";
                }
      
            }
            catch(Exception ex)
            {
                return ex.ToString();
            }
            
        }

        public async Task<responseDrugStockAndCountDrugInPrescription> checkStockDrugAndDrugInPrescriptionMachine(string DrugCode)
        {
            try
            {
                var respose = new responseDrugStockAndCountDrugInPrescription();
                var drugStock = await ( from a in _DbcontextSecuill.TSummaryStocks
                                        join b in _DbcontextSecuill.MDrugs on a.DrugCode equals b.DrugCode
                                        where a.DrugCode == DrugCode         
                                        select new
                                        {
                                            drugCode = a.DrugCode,
                                            drugName = b.DrugNameEn,
                                            stockDrugMachine = a.StockQty,
                                        }
                                        ).ToListAsync();

                var prescription = await ( from a in _DbcontextSecuill.TPrescriptions
                                           where a.DrugCode == DrugCode && a.PresDispensedstatus == "W" && EF.Functions.DateDiffHour(a.InsertDt, DateTime.Now) < 24
                                           select new
                                           {
                                               presNo = a.PresNo,
                                               presDate = a.PresDate,
                                               hn = a.PatHn,
                                               patientName = a.PatName,
                                               drugCode = a.DrugCode,
                                               drugName = a.DrugName,
                                               orderQty = a.PresOrderqty
                                           }
                                          ).ToListAsync();

                respose.drugCode = drugStock[0].drugCode;
                respose.drugName = drugStock[0].drugName;
                respose.stockDrugMachine = drugStock[0].stockDrugMachine ?? 0;
                
                var newLS = new List<string>();
                decimal countDrugInPrescription = 0;
                foreach (var item in prescription)
                {
                    newLS.Add(
                        string.Concat("ใบยา: ", item.presNo, ", ",
                                      "ผป: ", item.patientName, ", ",
                                      "จำนวน: ", item.orderQty, ""
                                     )
                    );

                    countDrugInPrescription += item.orderQty ?? 0; // nullable ?? is null = 0
                }

                respose.sumaryDrugInPrescription = countDrugInPrescription;
                respose.prescriptionDrugLists = newLS;

                return respose;
            }
            catch (Exception ex)
            {
                Debug.Write(ex.ToString());
                return new responseDrugStockAndCountDrugInPrescription();
            }

        }

    }
}
