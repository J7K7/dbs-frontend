"use client"
import { useEffect } from "react"
import AxiosService from "@/utils/axios/axiosService"

export default function Slots({ params } : { params : {productId : string}}) {
    useEffect(()=> {
        AxiosService.get(`product/getProductDetails/${params.productId}`,{
            success : (data : any) => {
                console.log("success", data)
            },
            failed : (data : any) => {
                console.log("failed", data)
            },
            error : (data : any) => {
                console.log("error", data)
            },
            addToken : true
        })
    }, [])
    return (
        <>
            <h1>Product Slots for ProductId: {params.productId}</h1>
        </>
    )
}