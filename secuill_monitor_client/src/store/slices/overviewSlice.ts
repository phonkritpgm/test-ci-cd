import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiOverview from "../../services/api/overview";
import { IResponseApi } from "../../interface/iResponseApi";

export const getCountDashBoard = createAsyncThunk("ovw/getCountDashBoard", async ({ date }: { date: string }) => {
    const response:IResponseApi = await apiOverview.getCountDashBoard(date);
    return response;
});

export const getDataChartLine = createAsyncThunk("ovw/getDataChartLine", async ({ date }: { date: string }) => {
    const response:IResponseApi = await apiOverview.getDataChartLine(date);
    return response;
});

export const getDataSummaryPickDrug = createAsyncThunk("ovw/getDataSummaryPickDrug", async ({ date }: { date: string }) => {
    const response:IResponseApi = await apiOverview.getDataSummaryPickDrug(date);
    return response;
});

export const getDataRefillHeader = createAsyncThunk("ovw/getDataRefillHeader", async ({ startDate }: { startDate: string }) => {
    const response:IResponseApi = await apiOverview.getDataRefillHeader(startDate);
    return response;
});

export const getDataRefillDetail = createAsyncThunk("ovw/getDataRefillDetail", async ({ date, time }: { date: string, time: string }) => {
    const response:IResponseApi = await apiOverview.getDataRefillDetail(date, time);
    return response;
});

interface IDataStateType {
    loading: boolean,
    data: [] | any,
    error: null,
}

export interface IInitialAllState{
    dataCountDashBoard: IDataStateType,
    dataChartLine: IDataStateType,
    dataSummaryPickDrug: IDataStateType,
    dataRefillHeader: IDataStateType,
    dataRefillDetail: IDataStateType,
}

const initialStateInFiled: IDataStateType = {
    loading: false,
    data: [],
    error: null,
}

const initialAllState: IInitialAllState = {
    dataCountDashBoard: initialStateInFiled,
    dataChartLine: initialStateInFiled,
    dataSummaryPickDrug: initialStateInFiled,
    dataRefillHeader: initialStateInFiled,
    dataRefillDetail: initialStateInFiled,
}

// ovw/getCountDashBoard
// ovw/getDataChartLine
// ovw/getDataSummaryPickDrug
// ovw/getDataRefillHeader
// ovw/getDataRefillDetail
const overviewSlice = createSlice({
    name: "ovw",
    initialState: initialAllState,
    reducers: {
      //...
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state: IInitialAllState, action: any) => {
                if (action.type.includes("getCountDashBoard")) {
                    state.dataCountDashBoard.loading = true;
                    state.dataCountDashBoard.error = null;
                } else if (action.type.includes("getDataChartLine")) {
                    state.dataChartLine.loading = true;
                    state.dataChartLine.error = null;
                } else if (action.type.includes("getDataSummaryPickDrug")) {
                    state.dataSummaryPickDrug.loading = true;
                    state.dataSummaryPickDrug.error = null;
                } else if (action.type.includes("getDataRefillHeader")) {
                    state.dataRefillHeader.loading = true;
                    state.dataRefillHeader.error = null;
                } else if (action.type.includes("getDataRefillDetail")) {
                    state.dataRefillDetail.loading = true;
                    state.dataRefillDetail.error = null;
                }
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state: IInitialAllState, action: any) => {
                if (action.type.includes("getCountDashBoard")) {
                    state.dataCountDashBoard.loading = false;
                    state.dataCountDashBoard.data = action.payload.payload;
                    state.dataCountDashBoard.error = null;
                } else if (action.type.includes("getDataChartLine")) {
                    state.dataChartLine.loading = false;
                    state.dataChartLine.data = action.payload.payload;
                    state.dataChartLine.error = null;
                } else if (action.type.includes("getDataSummaryPickDrug")) {
                    state.dataSummaryPickDrug.loading = false;
                    state.dataSummaryPickDrug.data = action.payload.payload;
                    state.dataSummaryPickDrug.error = null;
                } else if (action.type.includes("getDataRefillHeader")) {
                    state.dataRefillHeader.loading = false;
                    state.dataRefillHeader.data = action.payload.payload;
                    state.dataRefillHeader.error = null;
                } else if (action.type.includes("getDataRefillDetail")) {
                    state.dataRefillDetail.loading = false;
                    state.dataRefillDetail.data = action.payload.payload;
                    state.dataRefillDetail.error = null;
                }
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state: IInitialAllState, action: any) => {
                if (action.type.includes("getCountDashBoard")) {
                    state.dataCountDashBoard.loading = true;
                    state.dataCountDashBoard.error = action.payload.message;
                } else if (action.type.includes("getDataChartLine")) {
                    state.dataChartLine.loading = true;
                    state.dataChartLine.error = action.payload.message;
                } else if (action.type.includes("getDataSummaryPickDrug")) {
                    state.dataSummaryPickDrug.loading = true;
                    state.dataSummaryPickDrug.error = action.payload.message;
                } else if (action.type.includes("getDataRefillHeader")) {
                    state.dataRefillHeader.loading = true;
                    state.dataRefillHeader.error = action.payload.message;
                } else if (action.type.includes("getDataRefillDetail")) {
                    state.dataRefillDetail.loading = true;
                    state.dataRefillDetail.error = action.payload.message;
                }
            },
        );
    },
  });
  
  export default overviewSlice.reducer;