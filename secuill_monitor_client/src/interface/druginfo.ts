export interface IDrugInfo {
    drug_code: string,
    drug_name_en: string,
    drug_name_th:string,
    drug_barcode:string,
    stock_qty: number,
    drug_unit: string,
    stock_min: number,
    stock_max: number,
    drug_narcotic: string,
    drug_antibiotic: string,
    drug_highalert: string,
    drug_status: string,
    useConverUnit:boolean,
    unitqty: number,
    unitcode: string,
    convto: number,
    convtounitcode: string
}
