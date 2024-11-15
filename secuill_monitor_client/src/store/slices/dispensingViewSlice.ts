import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiDispensingView from "../../services/api/dispensingView";
import { AxiosResponseHeaders } from "axios";

// getDispensingPrescription,
// getFreeDispensing,
// getRefill,
export const getDispensingPrescription = createAsyncThunk("dpv/getDispensingPrescription", async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
    const response = await apiDispensingView.getDispensingPrescription(startDate, endDate);
    return response;
});

export const getFreeDispensing = createAsyncThunk("dpv/getFreeDispensing", async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
    const response =  await apiDispensingView.getFreeDispensing(startDate, endDate);
    return response;
});

export const getRefill = createAsyncThunk("dpv/getRefill", async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
    const response =  await apiDispensingView.getRefill(startDate, endDate);
    return response;
});

interface IDataStateType {
    loading: boolean,
    data: [] | any,
    error: null,
}

export interface IInitialAllState{
    dataDispensing: IDataStateType,
    dataFreeDispensing: IDataStateType,
    dataRefill: IDataStateType,
}

const initialStateInFiled: IDataStateType = {
    loading: false,
    data: [],
    error: null,
}

const initialAllState: IInitialAllState = {
    dataDispensing: initialStateInFiled,
    dataFreeDispensing: initialStateInFiled,
    dataRefill: initialStateInFiled,
}

// getDispensingPrescription,
// getFreeDispensing,
// getRefill,
const dispensingViewSlice = createSlice({
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
                if (action.type.includes("getDispensingPrescription")) {
                    state.dataDispensing.loading = true;
                    state.dataDispensing.error = null;

                } else if (action.type.includes("getFreeDispensing")) {
                    state.dataFreeDispensing.loading = true;
                    state.dataFreeDispensing.error = null;

                } else if (action.type.includes("getRefill")) {
                    state.dataRefill.loading = true;
                    state.dataRefill.error = null;
                }
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state: IInitialAllState, action: any) => {
                if (action.type.includes("getDispensingPrescription")) {
                    state.dataDispensing.loading = false;
                    state.dataDispensing.data = action.payload.payload;
                    state.dataDispensing.error = null;

                } else if (action.type.includes("getFreeDispensing")) {
                    state.dataFreeDispensing.loading = false;
                    state.dataFreeDispensing.data = action.payload.payload ;
                    state.dataFreeDispensing.error = null;

                } else if (action.type.includes("getRefill")) {
                    state.dataRefill.loading = false;
                    state.dataRefill.data = action.payload.payload ;
                    state.dataRefill.error = null;
                }
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state: IInitialAllState, action: AxiosResponseHeaders) => {
                if (action.type.includes("getDispensingPrescription")) {
                    state.dataDispensing.loading = true;
                    state.dataDispensing.error = action.payload.message;

                } else if (action.type.includes("getFreeDispensing")) {
                    state.dataFreeDispensing.loading = true;
                    state.dataFreeDispensing.error = action.payload.message;

                } else if (action.type.includes("getRefill")) {
                    state.dataRefill.loading = true;
                    state.dataRefill.error = action.payload.message;
                }
            },
        );
    },
  });
  
  export default dispensingViewSlice.reducer;