export interface iReportDrugRefill{
    no: number,
    drugCode: string,
    drugName:string,
    min: number,
    max: number,
    qty: number,
    diff: number,
    lotExp: string,
    note: string
}

export interface iReportSummaryPick{
    no: number,
    drugcode: string,
    drugname: string,
    varqty: number,
    freeq: number,
    pickall: number
}

export interface iReportDrugExp{
    drugcode:string,
    drugname:string,
    lot_no:string,
    lot_exp_calc:string,
    lot_qty: number,
    lot_maxqty: number
}