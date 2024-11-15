using backend_secuill.Database;
using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.DashBoard;
using backend_secuill.Models.Prescription;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Net.NetworkInformation;

namespace backend_secuill.Repositories
{
    public class PrescriptionRepository : IPrescriptionRepository
    {
        private readonly SecuillV5TuContext _Dbcontext;
        IConfiguration config = new ConfigurationBuilder()
                       .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false).Build();
        public PrescriptionRepository(SecuillV5TuContext dbcontext)
        {
            _Dbcontext = dbcontext;
        }

        public async Task<int> GetCountPrescritpion(string prescriptionDate)
        {
            var count =  await _Dbcontext.TPrescriptions.Where(wp=>wp.PresDate == prescriptionDate).GroupBy(gp => gp.PresNo).CountAsync();
            return count;
        }

        public async Task<int> GetCountPickByPrescription(string prescriptionDate)
        {
            var count = await _Dbcontext.TPrescriptions.Where(pp => pp.PresDate == prescriptionDate && pp.PresDispensedstatus == "C").GroupBy(gpp=>gpp.PresNo).CountAsync();
            return count;
        }
        public async Task<int> GetCountFreeDispense(string prescriptionDate)
        {
            var count = await _Dbcontext.TOrderByUsers.Where(obu => obu.OrderDate == prescriptionDate && obu.OrderDispensedstatus =="C").GroupBy(gobu => gobu.OrderNo).CountAsync();
            return count;
        }
        public async Task<int> GetCountCancel(string prescriptionDate)
        {
            var count = await _Dbcontext.TPrescriptions.Where(pp => pp.PresDate == prescriptionDate && pp.PresStatus == "C").GroupBy(gpp => gpp.PresNo).CountAsync();
            return count;
        }



        public async Task<List<responseChartLineModel>> GetValueChartLine(string prescriptionDate)
        {
            var objValueChart = await _Dbcontext.TPrescriptions
                .Select(x => new
                {
                    presno = x.PresNo,
                    orderaccepttime = x.PresOrderaccepttime,
                    presdate = x.PresDate
                })
                .Where(x => x.presdate == prescriptionDate)
                .GroupBy(x => x.orderaccepttime)
                .Select(x => new
                {
                    Orderaccept = x.Select(y => y.orderaccepttime).FirstOrDefault().Substring(0, 2),
                    Count = x.Select(y => y.presno).Distinct().Count(),
                   
                })
                .ToListAsync();
              
                                                          
                  
            List<responseChartLineModel> responseChartLineModel = new List<responseChartLineModel>();
            for (var i = 1; i<= 24; i++)
            {
                var x = objValueChart
                    .Select(x=>new { orderAccept = x.Orderaccept , count = x.Count})
                    .Where(x => x.orderAccept == i.ToString().PadLeft(2,'0'))
                    .ToList();
                if (x.Count != 0)
                {
                    responseChartLineModel.Add(
                        new responseChartLineModel { label = x.Select(y => y.orderAccept).FirstOrDefault(), y = x.Select(y => y.count).FirstOrDefault() }
                    );
                }
                else
                {
                    responseChartLineModel.Add(
                        new responseChartLineModel { label = i.ToString().PadLeft(2, '0'), y = 0 }
                    );
                };
            }

            return responseChartLineModel;
        }

        public async Task<string> updateStatusPres(int runningno,updateStatusPresModel updateStatusPresModel)
        {
            var Query = $"UPDATE T_Prescription SET pres_status = @1,pres_statusdesc = @2 WHERE pres_runningno = {runningno} ";
            SqlConnection conn = new SqlConnection(config.GetConnectionString("pathsql_secuill"));
            SqlCommand comm = new SqlCommand(Query, conn);
            try
            {
                conn.Open();
                comm.Parameters.Clear();
                comm.Parameters.AddWithValue("@1", updateStatusPresModel.pres_status);
                comm.Parameters.AddWithValue("@2", updateStatusPresModel.pres_statusdesc);
                comm.ExecuteNonQuery();
                return "SUCCESS";
            }
           catch(Exception e)
            {
                return e.ToString();
            }
            finally
            {
                conn.Close();
                comm.Dispose();
            }

        }

    }
}
