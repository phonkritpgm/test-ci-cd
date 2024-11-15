using backend_secuill.Models.DashBoard;
using backend_secuill.Models.PickDrug;

namespace backend_secuill.Interface
{
    public interface ISummaryPickRepository
    {
        Task<List<responseQtyPerHourModel>> GetQtyPerHour(string prescriptionDate);
        Task<List<resposePickPrescription>> resposePickPres(string startDate , string endDate);
        Task<List<resposePickFreeOrderModel>> getDatePickFreeOrder(string pick_date,string endDate);
        Task<List<responseReportSummaryPickModel>> ResponseReportSummaryPick(string startDate, string endDate);
    }
}
