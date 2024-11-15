import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { iReportDrugExp, iReportDrugRefill, iReportSummaryPick } from "../../interface/iReport";
import { AxiosResponseHeaders } from "axios";
import apiReport from '../../services/api/report';
import { IResponseApi } from "../../interface/iResponseApi";

interface IDataStateReportDrugRefillType {
    loading: boolean,
    data: Array<iReportDrugRefill>,
    tmpData: Array<iReportDrugRefill>,
    error: null,
}

interface IDataStateReportSummaryPickType {
    loading: boolean,
    data: Array<iReportSummaryPick>,
    error: null,
}

interface IDataStateReportDrugExp {
    loading: boolean,
    data: Array<iReportDrugExp>,
    tmpData: Array<iReportDrugExp>,
    error: null,
}

export interface IInitialAllState{
    dataReportRefill:IDataStateReportDrugRefillType,
    dataReportSummaryPick:IDataStateReportSummaryPickType
    dataReportDrugExp:IDataStateReportDrugExp
}

const initialStateInFiledReportDrugRefill: IDataStateReportDrugRefillType = {
    loading: false,
    data: [],
    tmpData: [],
    error: null,
}

const initialStateInFiledReportSummaryPick: IDataStateReportSummaryPickType = {
    loading: false,
    data: [],
    error: null,
}

const initialStateInFiledReportDrugExp: IDataStateReportDrugExp = {
    loading: false,
    data: [],
    tmpData: [],
    error: null,
}

const initialAllState : IInitialAllState = {
    dataReportRefill:initialStateInFiledReportDrugRefill,
    dataReportSummaryPick:initialStateInFiledReportSummaryPick,
    dataReportDrugExp:initialStateInFiledReportDrugExp
}

export const getReportDrugRefill = createAsyncThunk("report/reportDrugRefill",async() => {
    const res:IResponseApi = await apiReport.getDrugRefill();   
    return res;
});

export const filterReportDrugRefill = createAsyncThunk("report/filterReportDrugRefill",async({ filterStatus } : { filterStatus: string })=>{
    return { payload: filterStatus };
});

export const getReportSummaryPick = createAsyncThunk("report/reportSummaryPick",async({startDate,endDate}:{startDate:string,endDate:string})=>{
    const res:IResponseApi = await apiReport.getSummaryPick(startDate,endDate);
    return res;
});

export const getReportDrugExp = createAsyncThunk("report/reportDrugExp",async() => {
    const res:IResponseApi = await apiReport.getDrugExp();
    return res;
});

export const filterReportDrugExp = createAsyncThunk("report/filterReportDrugExp",async({ filterStatus } : { filterStatus: string }) => {
    return { payload: filterStatus };
});


const reportSlice = createSlice({
    name:"stk",
    initialState:initialAllState,
    reducers:{
        //...
    },
    extraReducers: (builder)=> {
        builder
            .addMatcher(
                (action)=>action.type.endsWith("/pending"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("reportDrugRefill")){
                        state.dataReportRefill.loading = true;
                        state.dataReportRefill.error = null;
                    }
                    else  if (action.type.includes("reportSummaryPick")){
                        state.dataReportSummaryPick.loading = true;
                        state.dataReportSummaryPick.error = null;
                    }
                    else  if (action.type.includes("reportDrugExp")){
                        state.dataReportDrugExp.loading = true;
                        state.dataReportDrugExp.error = null;
                    }
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/fulfilled"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("reportDrugRefill")){
                        state.dataReportRefill.loading = false;
                        state.dataReportRefill.data = action.payload.payload;
                        state.dataReportRefill.tmpData = action.payload.payload;
                        state.dataReportRefill.error = null;
                    }
                    else if (action.type.includes("filterReportDrugRefill")){
                        state.dataReportRefill.loading = false;
                        if(action.payload.payload == "SHOW_TO_REFILL"){
                            const fillDiff = state.dataReportRefill.tmpData.filter( ( d: iReportDrugRefill ) => ( d.diff > 0 ) );
                            state.dataReportRefill.data = fillDiff;
                        } else{
                            state.dataReportRefill.data = state.dataReportRefill.tmpData;
                        }        
                        state.dataReportRefill.error = null;
                    } 
                    else if (action.type.includes("reportSummaryPick")){
                        state.dataReportSummaryPick.loading = false;
                        state.dataReportSummaryPick.data = action.payload.payload;
                        state.dataReportSummaryPick.error = null;
                    }         
                    else if (action.type.includes("reportDrugExp")){
                        state.dataReportDrugExp.loading = false;
                        state.dataReportDrugExp.data = action.payload.payload;
                        state.dataReportDrugExp.tmpData = action.payload.payload;
                        state.dataReportDrugExp.error = null;
                    } 
                    else if (action.type.includes("filterReportDrugExp")){
                        state.dataReportDrugExp.loading = false;
                        if(action.payload.payload == "SHOW_TO_EXP"){

                            const addDays = (date: string, days: number) => {
                                const result = new Date(date);
                                result.setDate(result.getDate() + days);
                                return result;
                            }

                            const daysDifference = (date1: string, date2: string) => {
                                const dt1 = new Date(date1);
                                const dt2 = new Date(date2);
                                // One day in milliseconds
                                const oneDay = 1000 * 60 * 60 * 24;
                                // Calculating the time difference between two dates
                                const diffInTime = dt2.getTime() - dt1.getTime();
                                // Calculating the no. of days between two dates
                                const diffInDays = Math.round(diffInTime / oneDay);
                                return diffInDays;
                            }

                            const fillDiffDate = state.dataReportDrugExp.tmpData.filter( 
                                ( d: iReportDrugExp ) => 
                                    ( daysDifference(new Date().toString(), addDays(d.lot_exp_calc, -30).toString()) <= 0 )
                                );
                            state.dataReportDrugExp.data = fillDiffDate;

                        } else{
                            state.dataReportDrugExp.data = state.dataReportDrugExp.tmpData;
                        }
                        state.dataReportDrugExp.error = null;
                    }                
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/rejected"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("reportDrugRefill")){
                        state.dataReportRefill.loading = false;
                        state.dataReportRefill.error =  action.payload.message;
                    }
                    else if (action.type.includes("reportSummaryPick")){
                        state.dataReportSummaryPick.loading = false;
                        state.dataReportSummaryPick.error =  action.payload.message;
                    }
                    else if (action.type.includes("reportDrugExp")){
                        state.dataReportDrugExp.loading = false;
                        state.dataReportDrugExp.error =  action.payload.message;
                    }
                 
                }
            )
    }
});
export default reportSlice.reducer;