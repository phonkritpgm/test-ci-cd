import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import drugInfo from "../../services/api/drugsInfo";
import { IDrugInfo } from "../../interface/druginfo";

export const getDrugInfo = createAsyncThunk("druginfo/getDrugInfo",async()=>{
    const response = await drugInfo.getDrugInfo();
    return response;
});

export const insertDrug = createAsyncThunk("druginfo/insertDrug",async(DrugDetail:IDrugInfo)=>{
    const response:any = await drugInfo.insertDrug(DrugDetail);
   return response
});

export const updateDrug = createAsyncThunk("druginfo/updateDrug",async(DrugDetail:IDrugInfo)=>{
    const response:any = await drugInfo.updateDrug(DrugDetail);
    return response
});

export const filterDrug = createAsyncThunk("druginfo/filterDrug",async({search}:{search:string})=>{
    return search;
})

interface IDataStateType {
    loading: boolean,
    data: Array<IDrugInfo>,
    temp: Array<IDrugInfo>,
    error:null
}

interface IDataExecDrug {
    loading: boolean,
    data:[],
    error:null
}

export interface IInitialAllState {
    dataDrugInfo: IDataStateType
    dataRefUpdateDrug : IDataExecDrug
}

const initialStateInFiled: IDataStateType = {
    loading: false,
    data: [],
    temp: [],
    error:null
}

const initialStateInFiledRefUpdate : IDataExecDrug = {
    loading: false,
    data:[],
    error:null
}

const initialAllState: IInitialAllState = {
    dataDrugInfo:initialStateInFiled,
    dataRefUpdateDrug:initialStateInFiledRefUpdate
}


const drugInfoSlice = createSlice({
    name:"druginfo",
    initialState:initialAllState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state: IInitialAllState, action: any) => {
                    if (action.type.includes("getDrugInfo")){
                        state.dataDrugInfo.loading = true;
                        state.dataDrugInfo.error = null;
                    }
                    else if (action.type.includes("insertDrug")){
                        state.dataRefUpdateDrug.loading = true;
                        state.dataRefUpdateDrug.error = null;
                    }
                    else if (action.type.includes("updateDrug")){
                        state.dataRefUpdateDrug.loading = true;
                        state.dataRefUpdateDrug.error = null;
                    }
                }   
            )
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state: IInitialAllState, action: any) => {
                    if (action.type.includes("getDrugInfo")){
                        state.dataDrugInfo.loading = false;
                        state.dataDrugInfo.data = action.payload.payload;
                        state.dataDrugInfo.temp = action.payload.payload;
                    }
                    else if (action.type.includes("filterDrug")){
                        if (action.payload != ""){
                            state.dataDrugInfo.data = state.dataDrugInfo.temp
                            .filter(x=>x.drug_name_en.toLowerCase().includes(action.payload.toLowerCase()));
                        }else{
                            state.dataDrugInfo.data = state.dataDrugInfo.temp;
                        }
                      
                    }
                    else if (action.type.includes("insertDrug")){
                        state.dataRefUpdateDrug.loading = false;
                        //state.dataRefUpdateDrug.data = action.payload;
                        state.dataRefUpdateDrug.error = action.payload.error
                    }
                    else if (action.type.includes("updateDrug")){
                        state.dataRefUpdateDrug.loading = false;
                        //state.dataRefUpdateDrug.data = action.payload;
                        state.dataRefUpdateDrug.error = action.payload.error
                    }
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state: IInitialAllState, action: any) => {
                    if (action.type.includes("getDrugInfo")){
                        state.dataDrugInfo.loading = true;
                        state.dataDrugInfo.error = action.payload.message;
                    }
                    else if (action.type.includes("insertDrug")){                           
                        state.dataRefUpdateDrug.loading = true;
                        state.dataRefUpdateDrug.error = action.payload.message;                                            
                    }
                    else if (action.type.includes("updateDrug")){
                        state.dataRefUpdateDrug.loading = true;
                        state.dataRefUpdateDrug.error = action.payload.message;                                            
                    }
                }
            )
    }
    
});

export default drugInfoSlice.reducer;