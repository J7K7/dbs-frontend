import Link from "next/link"

export default function ProductDetails({params} : { params: { productId: string } }) { 
    return (
        <>
            <h1>Product {params.productId}</h1>
        </>
    )
}