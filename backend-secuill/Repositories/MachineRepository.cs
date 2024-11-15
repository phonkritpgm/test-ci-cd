using backend_secuill.Interface;
using backend_secuill.Models;
using backend_secuill.Models.Machine;
using Microsoft.EntityFrameworkCore;

namespace backend_secuill.Repositories
{
    public class MachineRepository: IMachineRepository
    {
        private readonly SecuillV5TuContext _DbContext;

        public MachineRepository(SecuillV5TuContext secuillV5TuContext)
        {
            _DbContext = secuillV5TuContext;
        }

        public async Task<List<responseMachineUnitModel>> getMachineUnit()
        {
            var result = await _DbContext.MMachineUnits.Select(x => new { x.UnitId,x.UnitName,x.UnitNo}).ToListAsync();
            List< responseMachineUnitModel > List = new List< responseMachineUnitModel >();
            foreach (var model in result) {
                List.Add(
                    new responseMachineUnitModel()
                    {
                        unitID = model.UnitId,
                        unitName = model.UnitName,
                        unitNo = model.UnitNo,
                    }
                );       
            }
            return List;
        }

        public async Task<List<responseShelfModel>> getMachineShelf(string UnitNo)
        {
            var result = await _DbContext.MShelf
                .Select(x => new { 
                    x.ShelfNo,
                    x.ShelfId,
                    x.UnitNo,
                    x.ShelfName,
                    x.ShelfLocationid,
                    x.ShelfSafebox,
                    x.ShelfRefrigeretor,
                    x.ShelfStatus
                })
                .Where(x => UnitNo != "" ? x.UnitNo == UnitNo : x.UnitNo != null)
                .ToListAsync();

            List<responseShelfModel> responseShelfModels = new List<responseShelfModel>();
            foreach (var model in result) {
                responseShelfModels.Add(new responseShelfModel() { 
                    shelfID = model.ShelfId,
                    shelfMachineID = model.ShelfLocationid,
                    unitNo = model.UnitNo,
                    shelfName = model.ShelfName,
                    shelfNo = model.ShelfNo,
                    shelfRefrigerator = model.ShelfRefrigeretor,
                    shelfSafeBox = model.ShelfSafebox,
                    shelfStatus = model.ShelfStatus
                });
            }

            return responseShelfModels;
        }

        public async Task<List<responseSlotModel>> getDrugInSlot(string ShelfNo)
        {
            var result = await _DbContext.MSlots
                .Join(_DbContext.MDrugs,
                s => s.DrugCode,
                d => d.DrugCode,
                (s, d) => new
                {
                    s.ShelfNo,
                    s.SlotId,
                    s.SlotName,
                    d.DrugCode,
                    d.DrugNameEn,
                    s.SlotQty,
                    s.SlotMax,
                    s.SlotStatus
                })
                .Where(x => ShelfNo != "" ? x.ShelfNo == ShelfNo : x.ShelfNo != null)
                .ToListAsync();

            List<responseSlotModel> responseSlotModels = new List<responseSlotModel>();
            foreach (var model in result) {
                responseSlotModels.Add(new responseSlotModel
                {
                    drugCode = model.DrugCode,
                    drugName = model.DrugNameEn,
                    slotId = model.SlotId,
                    slotName = model.SlotName,
                    qty = (int)model.SlotQty,
                    maxQty = (int)model.SlotMax,
                    slotStatus = model.SlotStatus,
                    shelfNo = model.ShelfNo
                });
            }
            return responseSlotModels;
        }
    }
}
