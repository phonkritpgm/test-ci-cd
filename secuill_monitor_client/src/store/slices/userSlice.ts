import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import users from '../../services/api/users';
import { AxiosResponseHeaders } from "axios";
import { IResponseApi } from "../../interface/iResponseApi";
import { IBodyUpdateUser, IPermission, IUser, IWardMaster } from "../../interface/IUsers";

export const getAllUsers = createAsyncThunk("usr/getAllUsers",async()=>{
    const response:IResponseApi = await users.getAllUsers();
    console.log(response);
    return response;
});

export const getUserPermission = createAsyncThunk("usr/getUserPermission",async()=>{
    const response:IResponseApi = await users.getUserPermission();
    return response;
});

export const getWardMaster = createAsyncThunk("usr/getWardMaster",async()=>{
    const response:IResponseApi = await users.getWardMaster();
    return response;
});

export const updateMUsers = createAsyncThunk("usr/updateMUsers",async({ bodyParams }:{ bodyParams: IBodyUpdateUser })=>{
    const response:IResponseApi = await users.updateMUsers(bodyParams);
    return response;
});

interface IDataStateUsers {
    loading: boolean,
    data: Array<IUser>,
    temp:Array<IUser>,
    error: null,
}

interface IUserPermission {
    loading: boolean,
    data: Array<IPermission>,
    error: null,
}

interface IWard {
    loading: boolean,
    data: Array<IWardMaster>,
    error: null,
}

interface IUpdateUser {
    loading: boolean,
    data: [],
    error: null,
}

export interface IInitialAllState{
    dataListUsers: IDataStateUsers
    dataPermission: IUserPermission
    dataWardMaster: IWard
    dataUpdate: IUpdateUser
}

const initialStateUsers: IDataStateUsers = {
    loading: false,
    data: [],
    temp: [],
    error: null,
}

const initialStatePermission: IUserPermission = {
    loading: false,
    data: [],
    error: null,
}

const initialStateWard: IWard = {
    loading: false,
    data: [],
    error: null,
}

const initialStateUpdateUser: IUpdateUser = {
    loading: false,
    data: [],
    error: null,
}

const initialAllState : IInitialAllState = {
    dataListUsers: initialStateUsers,
    dataPermission: initialStatePermission,
    dataWardMaster: initialStateWard,
    dataUpdate: initialStateUpdateUser,
}

const userSlice = createSlice({
    name:"usr",
    initialState:initialAllState,
    reducers:{
        //...
    },
    extraReducers: (builder)=> {
        builder
            .addMatcher(
                (action)=>action.type.endsWith("/pending"),
                (state: IInitialAllState,action:any) => {
                    if (action.type.includes("getAllUsers")){
                        state.dataListUsers.loading = true;
                        state.dataListUsers.error = null;
                    } else if (action.type.includes("getUserPermission")){
                        state.dataPermission.loading = true;
                        state.dataPermission.error = null;
                    } else if (action.type.includes("getWardMaster")){
                        state.dataWardMaster.loading = true;
                        state.dataWardMaster.error = null;
                    } else if (action.type.includes("updateMUsers")){
                        state.dataUpdate.loading = true;
                        state.dataUpdate.error = null;
                    }
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/fulfilled"),
                (state: IInitialAllState,action:any) => {
                    if (action.type.includes("getAllUsers")){
                        state.dataListUsers.loading = false;
                        state.dataListUsers.data = action.payload.payload;
                        state.dataListUsers.temp = action.payload.payload;
                        state.dataListUsers.error = null;
                    } else if (action.type.includes("getUserPermission")){
                        state.dataPermission.loading = false;
                        state.dataPermission.data = action.payload.payload;
                        state.dataPermission.error = null;
                    } else if (action.type.includes("getWardMaster")){
                        state.dataWardMaster.loading = false;
                        state.dataWardMaster.data = action.payload.payload;
                        state.dataWardMaster.error = null;
                    } else if (action.type.includes("updateMUsers")){
                        state.dataUpdate.loading = false;
                        state.dataUpdate.data = action.payload.payload;
                        state.dataUpdate.error = null;
                    }
                }
            )
            .addMatcher(
                (action)=>action.type.endsWith("/rejected"),
                (state: IInitialAllState,action:AxiosResponseHeaders) => {
                    if (action.type.includes("getAllUsers")){
                        state.dataListUsers.loading = true;
                        state.dataListUsers.error = action.payload.message;
                    } else if (action.type.includes("getUserPermission")){
                        state.dataPermission.loading = true;
                        state.dataPermission.error = action.payload.message;
                    } else if (action.type.includes("getWardMaster")){
                        state.dataWardMaster.loading = true;
                        state.dataWardMaster.error = action.payload.message;
                    } else if (action.type.includes("updateMUsers")){
                        state.dataUpdate.loading = true;
                        state.dataUpdate.error = action.payload.message;
                    }
                }
            )
    }
});

export default userSlice.reducer;