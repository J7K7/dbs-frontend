import AxiosService from "../axios/axiosService";
import { toast } from "react-toastify";
import { setBookingData } from "@/lib/features/booking/bookingSlice";

export const getBusinesscategory = (router : any, dispatch : any) => {
    // const requestedPage = router.pathname;
    // console.log(router.pathname)
    AxiosService.get('user/getBusinessCategory',{
        success: (data :any) => {
            console.log("reached success1");
            const id = data.response.bookingCategoryId
            dispatch(setBookingData(id))
            console.log("reached success2");
            //redirect to the requested page
            // console.log("this is router.asPath",router.asPath)
            // router.push(router.asPath)
            console.log("reached success3");
        },
        failed: (data : any) => {
            console.log("reached failde")
            if(data.msg === "No Business Category Selected"){
                router.push('/selectBusinessCategory');
            }else{
                toast.error(data.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    // draggable: true,
                });
            }
        },
        error: (data : any) => {
            console.log("Error occured in getting");
            toast.error(data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                // draggable: true,
            });
        },
        addToken: true
    })
}


