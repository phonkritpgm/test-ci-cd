using backend_secuill.Models.Drugs;

namespace backend_secuill.Interface
{
    public interface IDrugsRepository
    {
        Task<List<responseDrugModel>> getDrugMaster();
        Task<string> UpdateDrug(string drug_code, bodyDrugEditModel bodyDrugModel);
        Task<string> insertDrug(bodyDrugInsertModel bodyDrugInsertModel, string userUpdate);
        Task<List<responseDrugLotModel>> ResponseDrugLotModels();
        Task<responseConvertUnit> ResponseConvertUnit(string drugCode);
        Task<string> insertConvertDrugUnit(bodyInsertConvertDrugUnit bodyInsertConvertEditDrug);
        Task<string> updateConvertDrugUnit(string drugCode, bodyUpdateConvertDrugUnit bodyUpdateConvertDrugUnit);
    }
}
