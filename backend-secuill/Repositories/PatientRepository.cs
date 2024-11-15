using backend_secuill.Interface;
using backend_secuill.Models.Patient;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;

namespace backend_secuill.Repositories
{
    public class PatientRepository: IPatientRepository
    {
        private readonly SecuillV5TuContext _DbContext;
        
        public PatientRepository(SecuillV5TuContext secuillV5TuContext) { 
            _DbContext = secuillV5TuContext;
        }
        public async Task<List<responsePatientModel>> ReponsePatientModels()
        {
            var res = await _DbContext.MPatients
                .Join(_DbContext.MWards,
                p => p.PatWardcode,
                w => w.WardCode,
                (p, w) => new
                {
                    p.PatHn,
                    p.PatAn,
                    p.PatName,
                    p.PatDischargeddate,
                    p.PatWardcode,
                    w.WardName
                })
                .ToListAsync();

            List<responsePatientModel> responsePatientModels = new List<responsePatientModel>();
            foreach (var item in res) {
                responsePatientModels.Add(
                    new responsePatientModel
                    {
                        pat_hn = item.PatHn,
                        pat_an = item.PatAn,
                        pat_name = item.PatName,
                        pat_dischargeddate = item.PatDischargeddate,
                        pat_wardcode = item.PatWardcode,
                        ward_name = item.WardName,
                        countVer = _DbContext.TPrescriptions.Where(x=>x.PatHn == item.PatHn).ToList().Count(),
                        countFree = _DbContext.TOrderByUsers.Where(x => x.PatHn == item.PatHn).ToList().Count(),
                    }
                );
            }
            return responsePatientModels;
        }

        public async Task<List<responsePatientUsageModel>> ResponsePatientUsageModels(string HN)
        {
            var res = await _DbContext.TPrescriptions
                .Select(x => new {
                    ntype = "ver",
                    nOrderStatus = x.PresDispensedstatus,
                    nPatHn = x.PatHn,
                    nOrderDate = x.PresDate,
                    nOrderNo = x.PresNo,
                    nPickOrderqty = x.PickOrderqty,
                    nPresFinishtime = x.PresFinishtime,
                    nOrderQty = x.PresOrderqty,
                    nDrugCode = x.DrugCode,
                    nPresNoteprocessing = x.PresNoteprocessing,
                })
                .Where(x => x.nPatHn == HN)
                .Union(_DbContext.TOrderByUsers
                .Select( x  => new {
                    ntype = "free",
                    nOrderStatus = x.OrderDispensedstatus,
                    nPatHn=x.PatHn,
                    nOrderDate=x.OrderDate,
                    nOrderNo = x.OrderNo,
                    nPickOrderqty = x.PickOrderqty,
                    nPresFinishtime = x.PresFinishtime,
                    nOrderQty = x.OrderQty,
                    nDrugCode = x.DrugCode,
                    nPresNoteprocessing = x.PresNoteprocessing,

                })
                .Where(x => x.nPatHn == HN && x.nOrderStatus != "W")
                )
                .Join(_DbContext.MDrugs,
                pu => pu.nDrugCode,
                d => d.DrugCode,
                (pu,d)=> new {
                   pu.ntype,
                   pu.nOrderStatus,
                   pu.nPatHn,
                   pu.nOrderDate,
                   pu.nOrderNo,
                   pu.nPickOrderqty,
                   pu.nPresFinishtime,
                   pu.nOrderQty,
                   pu.nDrugCode,
                   d.DrugNameEn,
                   pu.nPresNoteprocessing
                })
                .OrderByDescending(x => x.nOrderDate)
                .ToListAsync();
            
            List<responsePatientUsageModel> responsePatientUsageModels = new List<responsePatientUsageModel>();
            foreach (var item in res)
            {
                responsePatientUsageModels.Add(
                    new responsePatientUsageModel
                    {
                        type = item.ntype,
                        pres_dispensedstatus = item.nOrderStatus,
                        pres_date = item.nOrderDate,
                        pres_no = item.nOrderNo,
                        pick_orderqty = item.nPickOrderqty,
                        pres_orderqty = item.nOrderQty,
                        pres_finishtime = item.nPresFinishtime,
                        drug_name = item.DrugNameEn,
                        pres_noteprocessing = item.nPresNoteprocessing
                    }
                );
            }

            return responsePatientUsageModels;
        }
    }
}
