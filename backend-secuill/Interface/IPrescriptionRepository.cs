using backend_secuill.Database;
using backend_secuill.Models.DashBoard;
using backend_secuill.Models.Prescription;

namespace backend_secuill.Interface
{
    public interface IPrescriptionRepository
    {
        Task<int> GetCountPrescritpion(string prescriptionDate);
        Task<int> GetCountPickByPrescription(string prescriptionDate);
        Task<int> GetCountFreeDispense(string prescriptionDate);
        Task<int> GetCountCancel(string prescriptionDate);
        Task<List<responseChartLineModel>> GetValueChartLine(string prescriptionDate);
        Task<string> updateStatusPres(int runningno, updateStatusPresModel updateStatusPresModel);
    }
}
