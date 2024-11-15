import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPatientInfo, IPatientUsage } from "../../interface/iPatient";
import { AxiosResponseHeaders } from "axios";
import { IResponseApi } from "../../interface/iResponseApi";
import apiPatient from "../../services/api/patient";


interface IDataStateType {
    loading: boolean,
    data: Array<IPatientInfo>,
    temp:Array<IPatientInfo>,
    error: null,
}

interface IDataStateTypePatientUsage {
    loading: boolean,
    data: Array<IPatientUsage>,
    error: null,
}


export interface IInitialAllState{
    dataPatientInfo:IDataStateType
    dataPatientUsage:IDataStateTypePatientUsage
}

const initialStateInFiled: IDataStateType = {
    loading: false,
    data: [],
    temp: [],
    error: null,
}

const initialStateInFiledPatientUsage: IDataStateTypePatientUsage = {
    loading: false,
    data: [],
    error: null,
}

const initialAllState : IInitialAllState = {
    dataPatientInfo:initialStateInFiled,
    dataPatientUsage:initialStateInFiledPatientUsage
}

export const getPatient = createAsyncThunk("pat/getPatient",async()=>{
    const response:IResponseApi = await apiPatient.getPatient();
    return response;
});

export const filterPatient = createAsyncThunk("pat/filterPatient",async({search}:{search:string})=>{
    return search;
})
export const getPatientUsage = createAsyncThunk("pat/PatientDrugUsage",async(hn:string)=>{
    const response:IResponseApi = await apiPatient.getPatientUsage(hn);
    return response;
});


const patientSlice = createSlice({
    name:"pat",
    initialState:initialAllState,
    reducers:{
        //...
    },
    extraReducers: (builder)=> {
        builder
            .addMatcher(
                (action)=>action.type.endsWith("/pending"),
                (state: IInitialAllState,action:any) => {
                    if (action.type.includes("getPatient")){
                        state.dataPatientInfo.loading = true;
                        state.dataPatientInfo.error = null;
                    }
                    else  if (action.type.includes("PatientDrugUsage")){
                        state.dataPatientUsage.loading = true;
                        state.dataPatientUsage.error = null;
                    }
                
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/fulfilled"),
                (state: IInitialAllState,action:any) => {     
                    if (action.type.includes("getPatient")){
                        state.dataPatientInfo.loading = false;
                        state.dataPatientInfo.data = action.payload.payload;
                        state.dataPatientInfo.temp = action.payload.payload;
                        state.dataPatientInfo.error = null;                  
                    } 
                    else if (action.type.includes("filterPatient")){
                        if (action.payload != ""){                
                            state.dataPatientInfo.data = state.dataPatientInfo.temp
                            .filter((x:IPatientInfo)=>
                                x.pat_hn.toLowerCase().includes(action.payload.toLowerCase() ||  x.pat_an.toLowerCase().includes(action.payload.toLowerCase())));                                      
                        }
                        else{
                            state.dataPatientInfo.data = state.dataPatientInfo.temp;
                        }            
                        state.dataPatientInfo.error = null;
                    }       
                    else if (action.type.includes("PatientDrugUsage")){
                        state.dataPatientUsage.loading = false;
                        state.dataPatientUsage.data = action.payload.payload;
                        state.dataPatientUsage.error = null;                  
                    } 
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/rejected"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("getPatient")){
                        state.dataPatientInfo.loading = true;
                        state.dataPatientInfo.error = action.payload.message;
                    }
                    else if (action.type.includes("PatientDrugUsage")){
                        state.dataPatientUsage.loading = true;
                        state.dataPatientUsage.error = action.payload.message;
                    }
                    
                }
            )
    }
});

export default patientSlice.reducer;