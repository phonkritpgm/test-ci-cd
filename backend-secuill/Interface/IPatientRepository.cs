using backend_secuill.Models.Patient;

namespace backend_secuill.Interface
{
    public interface IPatientRepository
    {
        Task<List<responsePatientModel>> ReponsePatientModels();
        Task<List<responsePatientUsageModel>> ResponsePatientUsageModels(string HN);
    }
}
