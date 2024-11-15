export interface iMachineUnit {
    unitID : string,
    unitNo : string,
    unitName : string
}

export interface iMachineShelf{
    shelfNo: string,
    shelfID: string,
    unitNo: string,
    shelfName: string,
    shelfMachineID: string,
    shelfSafeBox: string,
    shelfRefrigerator: string,
    shelfStatus: string
}

export interface iMachineSlot{
    shelfNo: string,
    slotId: string,
    slotName: string,
    drugCode: string,
    drugName: string,
    qty: number,
    maxQty: number,
    slotStatus: string
}