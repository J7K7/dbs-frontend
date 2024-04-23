import AxiosService from "../axios/axiosService";
import { loginSuccess } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import logoutController from "../logoutController";

const getProfileController = async (dispatch : any, router : any) => {
    await AxiosService.get('user/getProfile',
    {
        success : (data : any) => {
            const userData = data.response;
            dispatch(loginSuccess(userData));
        },
        failed : (data : any) => {
            logoutController(dispatch, router)
            toast.error(data.msg,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress:  undefined,
            });
            router.replace('login')
            
        },
        error: (data : any) => {
            // router.replace('login')
            toast.error(data.message,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress:  undefined,
            });
        },
        addToken : true
    }
    )
}

export default  getProfileController;