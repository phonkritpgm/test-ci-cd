export interface IResponseApi {
    statusCode:number
    message:string,
    payload:object
}


export const responseAPi:IResponseApi = {
	message:"",
	statusCode:0,
	payload:[]
}

export interface IPayloadErrorModel {
    field:string
    ,message:string
}
