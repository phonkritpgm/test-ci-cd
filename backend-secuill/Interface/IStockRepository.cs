using backend_secuill.Controllers;
using backend_secuill.Models;
using backend_secuill.Models.DashBoard;
using backend_secuill.Models.Stock;

namespace backend_secuill.Interface
{
    public interface IStockRepository
    {
        Task<List<responseHeaderHistoryRefillModel>> GetHeaderRefill(string startDate);
        Task<List<responseDrugRefillModel>> GetDrugRefill(string refillDate, string refillTime);
        Task<List<resposeRefillModel>> ResposeRefillModel(string startDate,string endDate);
        Task<List<responseStockModel>> ResponseStock();
        Task<List<responseReportRefillModel>> ResponseDrugRefillReport();
        Task<List<responseReportDrugExp>> ResposneReportDrugExp();
        Task<List<responseLotNumber>> ResponseLotNumbers(string drugCode);
        Task<string> insertLotNumber(bodyInsertLotNumber bodyInsertLotNumber, string userID);
        Task<string> updateLotNumber(bodyUpdateLotNumber bodyUpdateLotNumber, string drugCode, string Lotno, string userID);
        Task<string> updateStatusLotNumber(bodyUpdateStatusLotModel bodyUpdateStatusLotModel, string drugCode, string LotNo, string UserID);
    }
}
