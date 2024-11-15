// history dispensing prescription
export interface IDispensingType  {
    pres_orderacceptdate: string,
    ward_name: string,
    pres_no: string,
    pat_hn: string,
    pat_name: string,
    drug_name: string,
    pres_orderqty: number,
    pres_orderaccepttime: string,
    pick_qty: number,
    pick_time: string,  
    userPick: {
                userPickName:string
            }[]
}

// export interface dataDispenseType {
//     PrescriptionDate: string,
//     PrescriptionNo: string,
//     DrugName: string,
//     DrugQty: number,
//     ApproveTime: string,
//     DispenseQty:number,
//     UserDispense: string,
//     DispenseTime: string,
// }

// history free dispensing
// export interface dataFreeDispenseType{
//     PrescriptionDate:string,
//     PrescriptionNo:string,
//     DrugName:string,
//     PickQty:number,
//     DispenseTime:string,
//     UserDispense:string,
// }

export interface IFreeDispensingType{
    pick_date: string,
    order_no: string,
    drug_name: string,
    pick_qty: number,
    pick_time: string,
    userPick: Array<{userPickName: string}>
}

// history refill drug
// export interface dataRefill {
//     RefillDate:string,
//     DrugCode:string,
//     DrugName:string,
//     DrugQty:number,
//     Lot:string,
//     ApproveTime:string,
//     UserDispense:string
// }

export interface IDataRefill {
    refill_date :string,
    drug_code: string,
    drug_name_en: string,
    refill_qty: number,
    lot_no: string,
    refill_time: string,
    userRefill: Array< {userPickName:string}>,
    refill_counter: string
}