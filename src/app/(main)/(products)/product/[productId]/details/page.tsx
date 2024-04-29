"use client"
import AxiosService from "@/utils/axios/axiosService"
import { useEffect, useState } from "react"
import { ProductDetailsForm } from "@/components/forms/ProductDetailsForm"


export default function Details({ params } : { params : {productId : string}}) {
    const [formData, setFormData] = useState({});
    useEffect(()=> {
        AxiosService.get(`product/getProductDetails/${params.productId}`,{
            success : (data : any) => {
                console.log("success", data)
                setFormData(data.productData)
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
            <h1>Product Details for ProductId: {params.productId}</h1>
            <ProductDetailsForm
                formData={formData}
                setFormData={setFormData}
                isUpdateMode={true}
            />
        </>
    )
}