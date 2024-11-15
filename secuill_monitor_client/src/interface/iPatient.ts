export interface IPatientInfo{
    pat_hn: string,
    pat_an: string,
    pat_name: string,
    pat_dischargeddate?: Date,
    pat_wardcode: string,
    ward_name: string,
    countVer: number,
    countFree: number
}

export interface IPatientUsage{
    type: string,
    pres_dispensedstatus: string,
    pres_date: string,
    pres_no: string,
    drug_name: string,
    pres_orderqty: number,
    pres_noteprocessing: string,
    pick_orderqty: number,
    pres_finishtime?: Date
}