import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authentication from "../../services/api/authentication";
import Cookie, { cookieName } from "../../cookie/cookie";
import { IResponseApi } from "../../interface/iResponseApi";

export const loginUser = createAsyncThunk("auth/authLogin", async ({ username, password }: { username: string, password: string }) => {
    const response:IResponseApi = await authentication.loginUser(username, password);
    return response
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    try{
        return Object.assign([], {message: "Success", error: null});
    } catch(e) {
        return Object.assign([], {message: "Error", error: e});
    }
});

export const checkAuthenticationServer = createAsyncThunk("auth/checkAuthServer", async () => {
    const response:IResponseApi = await authentication.checkAuthenticationServer();
    return response;
});

export const setDataAuthentication = createAsyncThunk("auth/setDataAuthentication", async ({ data }: { data: object }) => {
    return data;
});

export const setOpenLogin = createAsyncThunk("auth/setOpenLogin", async () => {
    return "OpenLogin";
});

export const setOpenAuth = createAsyncThunk("auth/setOpenAuth", async () => {
    return "OpenAuth";
});

export const setStatusLogin = createAsyncThunk("auth/setStatusLogin", async ({ status }: { status: boolean }) => {
    return status;
});

export const setOpenAndCloseLoginPage = createAsyncThunk("auth/setOpenAndCloseLoginPage", async ({ status }: { status: boolean }) => {
    
    return status;
});




const authSlice = createSlice({
    name: "user",
    initialState: {
        dataAuth: null,
        dataCheckAuth: null,
        loading: false,
        error: null,
        openLogin: false,
        openCheckAuth: false,
        statusLogin: false,
        openAndCloseLoginPage: false,
    },
    reducers: {
      //...
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                state.error = null;
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state: any, action: any) => {
                state.loading = false;
                if (action.type.includes("authLogin")) {
                    state.dataAuth = action.payload.payload;
                    
                } else if (action.type.includes("checkAuthServer")) {
                    state.dataCheckAuth = action.payload.payload;

                } else if (action.type.includes("setOpenLogin")) {
                    state.openLogin = true;
                    state.openCheckAuth = false;

                } else if (action.type.includes("setOpenAuth")) {
                    state.openLogin = false;
                    state.openCheckAuth = true;

                } else if (action.type.includes("logoutUser")) {
                    state.statusLogin = action.payload.message == "Success" ? false : true;
                    state.dataAuth = [];
                    state.dataCheckAuth = [];
                    state.openLogin = true;
                    state.openCheckAuth = false;

                    state.error = null;
                    state.loading = false;

                    Cookie.updateExpireCookie(cookieName.user, -1);
                    Cookie.updateExpireCookie(cookieName.userInfo, -1);

                } else if (action.type.includes("setDataAuthentication")) {
                    state.dataAuth = action.payload.payload;

                } else if (action.type.includes("setStatusLogin")) {
                    if( action.payload == true ){
                        state.statusLogin = action.payload;
                        state.openAndCloseLoginPage = false;
                    } else{
                        state.statusLogin = action.payload;
                        state.openAndCloseLoginPage = true;
                    }

                } else if (action.type.includes("setOpenAndCloseLoginPage")) {
                    state.openAndCloseLoginPage = action.payload;
                }
            },
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            },
        );
    },
  });
  
  export default authSlice.reducer;