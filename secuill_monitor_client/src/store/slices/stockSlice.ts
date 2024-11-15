import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import apiStock from '../../services/api/stock';
import { IDrugLot, IinsertLotNumber, IListStock, ILotNumber, IupdateLotNumber, IupdateStatusLotNumber } from "../../interface/stock";
import { AxiosResponseHeaders } from "axios";
import { IResponseApi } from "../../interface/iResponseApi";

export const getListStock = createAsyncThunk("stk/getListStock",async()=>{
    const response:IResponseApi = await apiStock.getStock();
    return response;
});

export const filterListStock = createAsyncThunk("stk/filterListStock",async({search}:{search:string})=>{
    return search;
})

export const getLotNumber = createAsyncThunk("stk/getLotNumber",async(drugCode:string)=>{
    const response:IResponseApi = await apiStock.getLotNumber(drugCode);
    return response;
})

export const getDrugLot = createAsyncThunk("stk/getDrugLot",async()=>{
    const response:IResponseApi = await apiStock.getDrugInfo();
    return response;
})


export const filterDrugLot = createAsyncThunk("stk/filterDrugLot",async({search}:{search:string})=>{
    return search;
});

export const filterLotNumber = createAsyncThunk("stk/filterLotNumber",async({search}:{search:string})=>{
    return search;
});

export const insertLotNumber = createAsyncThunk("stk/insertLotNumber",async({data}:{data:IinsertLotNumber})=>{
    const response:IResponseApi = await apiStock.insertLotNumber(data);
    return response;
});

export const updateLotNumber = createAsyncThunk("stk/updateLotNumber",async({data,drugcode,lotnumber}:{data:IupdateLotNumber,drugcode:string,lotnumber:string})=>{
    const response:IResponseApi = await apiStock.updateLotNumber(data,drugcode,lotnumber);
    return response;
});

export const updateStatusLotNumber = createAsyncThunk("stk/updateStatusLotNumber",async({data,drugcode,lotnumber}:{data:IupdateStatusLotNumber,drugcode:string,lotnumber:string})=>{
    const response:IResponseApi = await apiStock.updateStatusLotNumber(data,drugcode,lotnumber);
    return response;
});




interface IDataStateType {
    loading: boolean,
    data: Array<IListStock>,
    temp:Array<IListStock>,
    error: null,
}

interface IDataStateLotNumberType {
    loading: boolean,
    data: Array<ILotNumber>,
    temp:Array<ILotNumber>,
    error: null,
}

interface IDataStateDrugLotType {
    loading: boolean,
    data: Array<IDrugLot>,
    temp:Array<IDrugLot>,
    error: null,
}

interface IDataStateExecuteType {
    loading: boolean,
    data: any,
    error: null,
}

export interface IInitialAllState{
    dataListStock:IDataStateType
    dataLotNumber:IDataStateLotNumberType
    dataDrugLot: IDataStateDrugLotType
    dataInsertLotNumber:IDataStateExecuteType
    dataUpdateLotNumber:IDataStateExecuteType
    dataUpdateStatusLot:IDataStateExecuteType
}

const initialStateInExecuteFiled: IDataStateExecuteType = {
    loading: false,
    data: [],
    error: null,
}


const initialStateInFiled: IDataStateType = {
    loading: false,
    data: [],
    temp: [],
    error: null,
}

const initialStateInFiledLot: IDataStateLotNumberType = {
    loading: false,
    data: [],
    temp:[],
    error: null,
}

const initialStateInFiledDrugLot: IDataStateDrugLotType = {
    loading: false,
    data: [],
    temp: [],
    error: null,
}

const initialAllState : IInitialAllState = {
    dataListStock:initialStateInFiled,
    dataLotNumber:initialStateInFiledLot,
    dataDrugLot:initialStateInFiledDrugLot,
    dataInsertLotNumber:initialStateInExecuteFiled,
    dataUpdateLotNumber:initialStateInExecuteFiled,
    dataUpdateStatusLot:initialStateInExecuteFiled
}

const stockSlice = createSlice({
    name:"stk",
    initialState:initialAllState,
    reducers:{
        //...
    },
    extraReducers: (builder)=> {
        builder
            .addMatcher(
                (action)=>action.type.endsWith("/pending"),
                (state: IInitialAllState,action:any) => {
                    if (action.type.includes("getListStock")){
                        state.dataListStock.loading = true;
                        state.dataListStock.error = null;
                    }
                    else if (action.type.includes("getLotNumber")){
                        state.dataLotNumber.loading = true;
                        state.dataLotNumber.error = null;
                    }
                    else if (action.type.includes("getDrugLot")){
                        state.dataDrugLot.loading = true;
                        state.dataDrugLot.error = null;
                    }
                    else if (action.type.includes("insertLotNumber")){
                        state.dataInsertLotNumber.loading = true;
                        state.dataInsertLotNumber.error = null;
                    }
                    else if (action.type.includes("updateLotNumber")){
                        state.dataUpdateLotNumber.loading = true;
                        state.dataUpdateLotNumber.error = null;
                    }
                    else if (action.type.includes("updateStatusLotNumber")){
                        state.dataUpdateStatusLot.loading = true;
                        state.dataUpdateStatusLot.error = null;
                    }
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/fulfilled"),
                (state: IInitialAllState,action:any) => {
                    if (action.type.includes("getListStock")){
                        state.dataListStock.loading = false;
                        state.dataListStock.data = action.payload.payload;
                        state.dataListStock.temp = action.payload.payload;
                        state.dataListStock.error = null;                  
                    }
                    else if (action.type.includes("filterListStock")){
                        if (action.payload != ""){                
                            state.dataListStock.data = state.dataListStock.temp
                            .filter((x:IListStock)=>x.drug_name.toLowerCase().includes(action.payload.toLowerCase()));                                      
                        }
                        else{
                            state.dataListStock.data = state.dataListStock.temp;
                        }            
                        state.dataListStock.error = null;
                    }
                    else if (action.type.includes("getLotNumber")){
                        state.dataLotNumber.loading = false;
                        state.dataLotNumber.data = action.payload.payload;
                        state.dataLotNumber.temp =  action.payload.payload;
                        state.dataLotNumber.error = null;           
                    }
                    else if (action.type.includes("getDrugLot")){
                        state.dataDrugLot.loading = false;
                        state.dataDrugLot.data = action.payload.payload;
                        state.dataDrugLot.temp = action.payload.payload;
                        state.dataDrugLot.error = null;           
                    }
                    else if (action.type.includes("filterDrugLot")){
                        if (action.payload != ""){                
                            state.dataDrugLot.data = state.dataDrugLot.temp
                            .filter((x:IDrugLot)=>x.drugName.toLowerCase().includes(action.payload.toLowerCase()));                                      
                        }
                        else{
                            state.dataDrugLot.data = state.dataDrugLot.temp;
                        }            
                        state.dataDrugLot.error = null;
                    }
                    else if (action.type.includes("filterLotNumber")){
                        if (action.payload != ""){                
                            state.dataLotNumber.data = state.dataLotNumber.temp
                            .filter((x:ILotNumber)=>x.lotno.toLowerCase().includes(action.payload.toLowerCase()));                                      
                        }
                        else{
                            state.dataLotNumber.data = state.dataLotNumber.temp;
                        }            
                        state.dataLotNumber.error = null;
                    }
                    else if (action.type.includes("insertLotNumber")){
                        state.dataInsertLotNumber.loading = false;
                        state.dataInsertLotNumber.data = action.payload;
                        state.dataInsertLotNumber.error = null;           
                    }
                    else if (action.type.includes("updateLotNumber")){
                        state.dataUpdateLotNumber.loading = false;
                        state.dataUpdateLotNumber.data = action.payload;
                        state.dataUpdateLotNumber.error = null;           
                    }
                    else if (action.type.includes("updateStatusLotNumber")){
                        state.dataUpdateStatusLot.loading = false;
                        state.dataUpdateStatusLot.data = action.payload;
                        state.dataUpdateStatusLot.error = null;   
                    }
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/rejected"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("getListStock")){
                        state.dataListStock.loading = true;
                        state.dataListStock.error = action.payload.message;
                    }
                    else if (action.type.includes("getLotNumber")){
                        state.dataLotNumber.loading = true;
                        state.dataLotNumber.error = action.payload.message;
                    }
                    else if (action.type.includes("getDrugLot")){
                        state.dataDrugLot.loading = true;
                        state.dataDrugLot.error = action.payload.message;
                    }
                    else if (action.type.includes("insertLotNumber")){
                        state.dataInsertLotNumber.loading = true;
                        state.dataInsertLotNumber.error = action.payload.message;
                    }
                    else if (action.type.includes("updateLotNumber")){
                        state.dataUpdateLotNumber.loading = true;
                        state.dataUpdateLotNumber.error = action.payload.message;
                    }
                    else if (action.type.includes("updateStatusLotNumber")){
                        state.dataUpdateStatusLot.loading = true;
                        state.dataUpdateStatusLot.error = action.payload.message;
                    }
                }
            )
    }
});

export default stockSlice.reducer;