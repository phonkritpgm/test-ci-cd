import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { iMachineShelf, iMachineSlot, iMachineUnit } from "../../interface/machine";
import { AxiosResponseHeaders } from "axios";
import apiMachineInfo from "../../services/api/machine";

interface IDataStateMachineUnitType {
    loading: boolean,
    data: Array<iMachineUnit>,
    error: null,
}

interface IDataStateMachineShelfType {
    loading: boolean,
    data: Array<iMachineShelf>,
    error: null,
}

interface IDataStateMachineSlotType {
    loading: boolean,
    data: Array<iMachineSlot>,
    error: null,
}


export interface IInitialAllState{
    dataMachineUnit:IDataStateMachineUnitType,
    dataMachineShelf:IDataStateMachineShelfType,
    dataMachineSlot:IDataStateMachineSlotType
}

const initialStateInFiledMachineUnit: IDataStateMachineUnitType = {
    loading: false,
    data: [],
    error: null,
}

const initialStateInFiledMachineShelf: IDataStateMachineShelfType = {
    loading: false,
    data: [],
    error: null,
}

const initialStateInFiledMachineSlot: IDataStateMachineSlotType = {
    loading: false,
    data: [],
    error: null,
}

const initialAllState : IInitialAllState = {
    dataMachineUnit:initialStateInFiledMachineUnit,
    dataMachineShelf:initialStateInFiledMachineShelf,
    dataMachineSlot:initialStateInFiledMachineSlot
}

export const getMachineUnit = createAsyncThunk("mac/getMachineUnit",async()=>{
    const res = await apiMachineInfo.getMacUnit();
    return res;
});

export const getMachineShelf = createAsyncThunk("mac/getMachineShelf",async(unitNo:string)=>{
    const res = await apiMachineInfo.getMacShelf(unitNo);
    return res;
});

export const getMachineSlot = createAsyncThunk("mac/getMachineSlot",async(shelfNo:string)=>{
    const res = await apiMachineInfo.getMacSlot(shelfNo);
    return res;
});


const machineSlice = createSlice({
    name:"mac",
    initialState:initialAllState,
    reducers:{
        //...
    },
    extraReducers: (builder)=> {
        builder
            .addMatcher(
                (action)=>action.type.endsWith("/pending"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("getMachineUnit")){
                        state.dataMachineUnit.loading = true;
                        state.dataMachineUnit.error = null;
                    }
                    else  if (action.type.includes("getMachineShelf")){
                        state.dataMachineShelf.loading = true;
                        state.dataMachineShelf.error = null;
                    }
                    else  if (action.type.includes("getMachineSlot")){
                        state.dataMachineSlot.loading = true;
                        state.dataMachineSlot.error = null;
                    }
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/fulfilled"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("getMachineUnit")){
                        state.dataMachineUnit.loading = false;
                        state.dataMachineUnit.data = action.payload.payload;
                        state.dataMachineUnit.error = null;
                    }
                    else  if (action.type.includes("getMachineShelf")){
                        state.dataMachineShelf.loading = false;
                        state.dataMachineShelf.data = action.payload.payload;
                        state.dataMachineShelf.error = null;
                    }         
                    else  if (action.type.includes("getMachineSlot")){
                        state.dataMachineSlot.loading = false;
                        state.dataMachineSlot.data = action.payload.payload;
                        state.dataMachineSlot.error = null;
                    }                 
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/rejected"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("getMachineUnit")){
                        state.dataMachineUnit.loading = false;
                        state.dataMachineUnit.error =  action.payload.message;
                    }
                    else if (action.type.includes("getMachineShelf")){
                        state.dataMachineShelf.loading = false;
                        state.dataMachineShelf.error =  action.payload.message;
                    }
                    else if (action.type.includes("getMachineSlot")){
                        state.dataMachineSlot.loading = false;
                        state.dataMachineSlot.error =  action.payload.message;
                    }               
                }
            )
        }
});

export default machineSlice.reducer;