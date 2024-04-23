import { logout } from "@/lib/features/auth/authSlice";



const  logoutController = (dispatch : any, router : any) => {
    
    window.localStorage.removeItem("token")
    dispatch(logout())
    router.replace('login')
}

export default logoutController
