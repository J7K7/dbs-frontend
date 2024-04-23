import { configureStore } from "@reduxjs/toolkit";
import  uiReducer from "./features/ui/uiSlice";
import authReducer from "./features/auth/authSlice"
import bookingReducer from  './features/booking/bookingSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            ui: uiReducer,
            auth: authReducer,
            booking : bookingReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']