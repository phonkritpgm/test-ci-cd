import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiVerifyPrescription from "../../services/api/verifyPrescription";
import { IVerifyDataSecuillAPI } from "../../interface/verifyPrescription";
import { AxiosResponseHeaders } from "axios";

// getPrescription
// updateStatusVerify
export const getPrescription = createAsyncThunk("ver/getPrescription", async ({ date }: { date: string }) => {
    const response = await apiVerifyPrescription.getPrescription(date);
    return response;
});

export const filterPrescription = createAsyncThunk("ver/filterPrescription", async ({ search }: { search: string }) => {
    return search;
});

export const filterStatusPrescription = createAsyncThunk("ver/filterStatusPrescription", async ({ status }: { status: string }) => {
    return status;
});

export const updateStatusVerify = createAsyncThunk("ver/updateStatusVerify", async ({ RowID, machineNo }: { RowID: string, machineNo: number }) => {
    const response =  await apiVerifyPrescription.updateStatusVerify(RowID, machineNo);
    return Object.assign(response, {statusHttp: response.statusCode, statusText: response.message})
});

export const updateTmpDataVerifySlice = createAsyncThunk("ver/updateTmpDataVerifySlice", async ({ RowID, machineNo }: { RowID: string, machineNo: number }) => {
    return {RowID: RowID, machineNo: machineNo};
});

export const updatePrescriptionInMachine = createAsyncThunk("ver/updatePrescriptionInMachine", async ({ runningNumber, obj }: { runningNumber: string, obj: object }) => {
    const response =  await apiVerifyPrescription.updatePrescriptionInMachine(runningNumber, obj);
    return Object.assign(response, {statusHttp: response.statusCode, statusText: response.message})
});

export const updatePrescriptionInMachineSlice = createAsyncThunk("ver/updateTmpPrescriptionInMachineVerifySlice", async ({ runningNumber, obj }: { runningNumber: string, obj: object }) => {
    return {runningNumber: runningNumber, obj: obj};
});

export const checkDrugToVerify = createAsyncThunk("ver/checkDrugToVerify", async ({ drugcode }: { drugcode: string }) => {
    const response =  await apiVerifyPrescription.checkDrugToVerify(drugcode);
    return response;
});

interface IPrescriptionDataStateType {
    loading: boolean,
    data: [] | any,
    tmpData: [] | any,
    error: null,
}

interface IDataStateType {
    loading: boolean,
    data: [] | any,
    error: null,
}

export interface IInitialAllState{
    dataPrescription: IPrescriptionDataStateType,
    dataUpdateStatusVerify: IDataStateType,
}

const initialPrescriptionStateInFiled: IPrescriptionDataStateType = {
    loading: false,
    data: [],
    tmpData: [],
    error: null,
}

const initialStateInFiled: IDataStateType = {
    loading: false,
    data: [],
    error: null,
}

const initialAllState: IInitialAllState = {
    dataPrescription: initialPrescriptionStateInFiled,
    dataUpdateStatusVerify: initialStateInFiled,
}

// ver/getPrescription
// ver/updateStatusVerify
const verifyPrescriptionSlice = createSlice({
    name: "verPres",
    initialState: initialAllState,
    reducers: {
      //...
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state: IInitialAllState, action: any) => {
                if (action.type.includes("getPrescription")) {
                    state.dataPrescription.loading = true;
                    state.dataPrescription.error = null;

                } else if (action.type.includes("updateStatusVerify")) {
                    state.dataUpdateStatusVerify.loading = true;
                    state.dataUpdateStatusVerify.error = null;
                }
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state: IInitialAllState, action: any) => {
                if (action.type.includes("getPrescription")) {
                    state.dataPrescription.loading = false;
                    state.dataPrescription.data = action.payload.payload;
                    state.dataPrescription.tmpData = action.payload.payload;
                    state.dataPrescription.error = null;

                } else if (action.type.includes("updateStatusVerify")) {
                    state.dataUpdateStatusVerify.loading = false;
                    state.dataUpdateStatusVerify.data = action.payload ;
                    state.dataUpdateStatusVerify.error = null;

                } else if (action.type.includes("updateTmpDataVerifySlice")) {
                    // set data with from delete
                    // state.dataPrescription.data = state.dataPrescription.tmpData.filter((items: IVerifyDataSecuillAPI) => items.rowID !== action.payload);
                    // state.dataPrescription.tmpData = state.dataPrescription.data;

                    // set data with from update value
                    // state.dataPrescription.data =  state.dataPrescription.tmpData.filter((items: IVerifyDataSecuillAPI) => items.rowID);
                    const index = state.dataPrescription.tmpData.findIndex((items: IVerifyDataSecuillAPI) => items.rowID === action.payload.RowID);
                    if (index !== -1) {
                        state.dataPrescription.tmpData[index].f_tomachineno = action.payload.machineNo;
                        state.dataPrescription.data = state.dataPrescription.tmpData;
                    }

                } else if (action.type.includes("filterPrescription")){
                    if (action.payload != ""){
                        state.dataPrescription.data =  state.dataPrescription.tmpData.filter(
                            (items: IVerifyDataSecuillAPI) => 
                                items.f_prescriptionno.toLowerCase().includes(action.payload.toLowerCase()) || 
                                items.f_patientname.toLowerCase().includes(action.payload.toLowerCase()) || 
                                items.f_orderitemname.toLowerCase().includes(action.payload.toLowerCase())                        
                        );  
                    }
                    else{
                        state.dataPrescription.data = state.dataPrescription.tmpData;  
                    }                             
                } else if (action.type.includes("filterStatusPrescription")){
                    if (action.payload != ""){
                        state.dataPrescription.data =  state.dataPrescription.tmpData.filter(
                            (items: IVerifyDataSecuillAPI) => 
                                items.f_tomachineno.toLowerCase().includes(action.payload.toLowerCase())              
                        );  
                    }
                    else{
                        state.dataPrescription.data = state.dataPrescription.tmpData;
                    }                   
                } else if (action.type.includes("updatePrescriptionInMachine")){
                    state.dataUpdateStatusVerify.loading = false;
                    state.dataUpdateStatusVerify.data = action.payload ;
                    state.dataUpdateStatusVerify.error = null;                       
                } else if (action.type.includes("updateTmpPrescriptionInMachineVerifySlice")){
                    state.dataPrescription.loading = false;
                    state.dataPrescription.error = null;
                    const index = state.dataPrescription.tmpData.findIndex((items: IVerifyDataSecuillAPI) => items.pres_runningno === action.payload.runningNumber);
                    if (index !== -1) {
                        state.dataPrescription.tmpData[index].pres_status = action.payload.obj.pres_status;
                        state.dataPrescription.tmpData[index].pres_statusdesc = action.payload.obj.pres_statusdesc;
                        state.dataPrescription.data = state.dataPrescription.tmpData;
                    }                      
                }
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state: IInitialAllState, action: AxiosResponseHeaders) => {
                if (action.type.includes("getPrescription")) {
                    state.dataPrescription.loading = true;
                    state.dataPrescription.error = action.payload.message;

                } else if (action.type.includes("updateStatusVerify")) {
                    state.dataUpdateStatusVerify.loading = true;
                    state.dataUpdateStatusVerify.error = action.payload.message;
                }
            },
        );
    },
  });
  
  export default verifyPrescriptionSlice.reducer;