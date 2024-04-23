import { createSlice } from "@reduxjs/toolkit";

interface Bookingstate {
    categoryId : number | null;
}

const  initialState : Bookingstate = {
    categoryId : null,
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingData : (state, action) => {
            state.categoryId = action.payload;
        },
        clearBookingData : (state) => {
            state.categoryId = null;
        }
    }
})

export const  {setBookingData ,clearBookingData}= bookingSlice.actions;

export default bookingSlice.reducer;