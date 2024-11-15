import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
import authSlice from "./slices/authSlice";
import overviewSlice from "./slices/overviewSlice";
import verifyPrescriptionSlice from "./slices/verifyPrescriptionSlice";
import dispensingViewSlice from "./slices/dispensingViewSlice";
import stockSlice from "./slices/stockSlice";
import drugInfoSlice from "./slices/drugInfoSlice";
import reportSlice from "./slices/reportSlice";
import machineSlice from "./slices/machineSlice";
import patientSlice from "./slices/patientSlice";
import users from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: users,
    auth: authSlice,
    ovw: overviewSlice,
    verify: verifyPrescriptionSlice,
    dpw: dispensingViewSlice,
    stk:stockSlice,
    druginfo:drugInfoSlice,
    report:reportSlice,
    mac:machineSlice,
    pat:patientSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
