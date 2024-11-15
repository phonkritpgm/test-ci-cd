using backend_secuill.Models.Machine;

namespace backend_secuill.Interface
{
    public interface IMachineRepository
    {
        Task<List<responseMachineUnitModel>> getMachineUnit();
        Task<List<responseShelfModel>> getMachineShelf(string UnitNo);

        Task<List<responseSlotModel>> getDrugInSlot(string ShelfNo);
    }
}
