import { createSlice } from "@reduxjs/toolkit";

interface UiState {
    sidebarOpen : Boolean
}

const initialState : UiState = {
    sidebarOpen : false,
}

const uiSlice =  createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSideBar : (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        }
    },
});

export const {toggleSideBar} = uiSlice.actions;
export default  uiSlice.reducer;