// count data dashboard and chart line
export interface  IDataCountType{   
    countPres: number,
    countPickPres: number,
    countPickFree: number,
    countPresCancel: number
}
 
export interface IDataChartType{
    label: string,
    y: number
}

// summary pick drug
export interface IDataSummaryPick {
    drug_code:string,
    drug_name:string,
    qtyPerHour:Array<{
        qty:number,
        hour:string
    }>
}

// refill drug
export interface IDataRefillType{
    refillDate: string,
    refillHours:Array<{hour:string}>  
}

export interface IDataRefillDetailType{
    drugName: string,
    refillQty: number
}