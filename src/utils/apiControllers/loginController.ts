import AxiosService from "../axios/axiosService";
import { loginStart, loginSuccess, loginFail, logout } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import { getBusinesscategory } from "./businessCategoryController";

interface UserData {
    email: string;
    password: string;
}

const loginController = async (userData : UserData, dispatch : any, router : any)=> {
    const {email, password}:UserData = userData;
    dispatch(loginStart());
    await AxiosService.post('login/', {
        data: {
            email : email,
            password : password
        },
        success: (data: any) => {
            console.log("success in loginController",data);
            window.localStorage.setItem("token", data.response.token);
            delete data.response.token;
            const userData = data.response;
            dispatch(loginSuccess(userData))
            toast.success("Login Successfull", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                // draggable: true,
                progress: undefined
            })
            router.push("/dashboard")
            // getBusinesscategory(router, dispatch);
            // if(errorMessage ==   "No Business Category Selected"){
            //     console.log("im iondie if")
            //     router.push("/selectBusinessCategory");
            // }else{
            //     router.push("/profile")
            // }
        },
        failed: (data: any) => {
            console.log(data.msg, data);
            dispatch(loginFail(data))
            toast.error(data.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                // draggable: true,
            });
        },
        error: (data : any) => {
            console.log(data.message);
            toast.error(data.message,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress:  undefined,
            });
        },
        addFormEncode: true
    },
    );
}

export  default loginController;