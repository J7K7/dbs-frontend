import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosService from "@/utils/axios/axiosService";
import { Console } from "console";

interface AuthState {
    isAuthenticated: boolean;
    user: any | null,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
};


// const loginController = createAsyncThunk("auth/login", async (userData : UserData) =>   { 
//     try {
//         const {email, password} = userData;
//         if (typeof email === 'string' && typeof password === 'string') {
//             // let response = 
//             await AxiosService.post('login/', {
//                 formData: {
//                     email : email,
//                     password : password
//                 },
//                 success: (data: any) => {
//                     console.log("success in loginController",data);
//                     // response =  data
//                     // return response;

//                 },
//                 failed: (data: any) => {
//                     console.log("Failed to Login", data);
//                     // response =  data
//                     // return response;
//                 },
//                 error: (data : any) => {
//                     console.log("Error Occured while logging In");
//                 }
//             },
//                 true
//             );
//             // console.log("this is the respons in loginController", response)
//             return response;
//         } else {
//             throw new Error('Email and password must be strings.');
//         }
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// });




const authSlice  = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.isAuthenticated = false;
            state.loading = true;
            state.error = null;
            state.user = null
        },
        loginSuccess(state, action) {
            // const { token, user } = action.payload;
            state.isAuthenticated = true;
            state.user = action.payload
            state.loading = false;
            state.error = null;
            // localStorage.setItem("token", token);
        },
        loginFail(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.loading = false;
        },
        // setToken(state, action) {
        //     const token = action.payload;
        //     if (token === "") {
        //         state.user = null;
        //         state.isAuthenticated = false;
        //     } else {
        //         const user = jwt_decode(token);
        //         state.user = user;
        //         state.isAuthenticated = true;
        //     }
        //     localStorage.setItem("token", token);
        // }
    },
    // reducers: {
    //     logout:(state)=> {
    //         state.isAuthenticated=false;
    //         state.loading=false;
    //         state.error=null;
    //         state.user=null;
    //     }
    // },
    // extraReducers: builder => {
    //     builder
    //       .addCase(loginController.pending,(state)=>{
    //           state.loading=true;
    //           state.error=null;
    //           state.isAuthenticated= false;
    //           state.user = null;
    //       })
    //       .addCase(loginController.fulfilled,(state,action)=>{
    //         //   console.log("action payload",action.payload)
    //           if(action.payload.Status){
    //             state.user= action.payload.response
    //             state.loading= false;
    //             state.error= null;
    //             state.isAuthenticated= true;
    //           }else{
    //             state.isAuthenticated=false;
    //             state.error= action.payload.msg;
    //             state.loading= false;
    //             state.user = null;
    //           }
    //       })
    //       .addCase(loginController.rejected,(state, action)=>{
    //             console.log("Login Rejection Reducer Called");
    //             state.loading=false;
    //             state.error=action.error.message || null;
    //        })
    //   }
})

export const { loginStart,loginSuccess,loginFail,logout } =  authSlice.actions 
export default authSlice.reducer;





    // reducers: {
        // loginStart(state) {
            // state.loading = true;
            // state.error = null;
        // },
        // loginSuccess(state, action) {
            // const { token, user } = action.payload;
            // state.isAuthenticated = true;
            // state.user = user;
            // state.loading = false;
            // localStorage.setItem("token", token);
        // },
        // loginFail(state, action) {
            // state.loading = false;
            // state.error = action.payload;
        // },
        // logout(state) {
            // state.isAuthenticated = false;
            // state.user = null;
            // localStorage.removeItem("token");
        // },
        // setToken(state, action) {
        //     const token = action.payload;
        //     if (token === "") {
        //         state.user = null;
        //         state.isAuthenticated = false;
        //     } else {
        //         const user = jwt_decode(token);
        //         state.user = user;
        //         state.isAuthenticated = true;
        //     }
        //     localStorage.setItem("token", token);
        // }
    // },

