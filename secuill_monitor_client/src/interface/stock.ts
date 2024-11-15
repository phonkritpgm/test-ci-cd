export interface IListStock {
    drug_code: string,
    drug_name: string,
    stock_qty: number,
    stock_min: number,
    stock_max: number
}

export interface ILotNumber {
    lotno: string,
    drugcode: string,
    drugname: string,
    lotqty: number,
    lotmaxqty: number,
    lotbbe: Date,
    lotexp: Date,
    lotstatus:string
}

export interface IDrugLot {
   drugCode: string,
   drugName: string,
   countLot: number
}

export interface IinsertLotNumber {
    lotno:string ,
	drugcode: string,
	lotqty: number,
	lotmaxqty: number,
	lotbbe:string ,
	lotexp:string ,
}

export interface IupdateLotNumber {
    lotbbe: string,
    lotexp: string,
    lotqty: number,
    lotmaxqty: number
}

export interface IupdateStatusLotNumber{
    lotstatus:string
}