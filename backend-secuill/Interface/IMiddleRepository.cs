
using backend_secuill.Models.Middle;
using Microsoft.AspNetCore.JsonPatch;

namespace backend_secuill.Interface
{
    public interface IMiddleRepository
    {
        Task<List<resposePrescriptionToVerifyModel>> getPrescriptionToVerify(string presDate);
        Task<string> updateStatusVerify(string RowID, int tomachineno, string FullName);

        Task<responseDrugStockAndCountDrugInPrescription> checkStockDrugAndDrugInPrescriptionMachine(string DrugCode);
    }
}
