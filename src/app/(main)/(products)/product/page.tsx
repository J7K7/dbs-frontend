"use client"
import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import AxiosService from '@/utils/axios/axiosService';
import Loading from '@/components/ui/Loading';
import { useRouter } from 'next/navigation';
import { SimpleButton } from '@/components/ui/Buttons';

// export const revalidate = 60;

function AllProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    AxiosService.get('product/getAllProductDetails/', {
      success: (data: any) => {
        console.log("success", data);
        setProducts(data.productsData);
        setLoading(false);
      },
      failed: (data: any) => {
        console.log("failed", data);
        setLoading(false);
      },
      error: (data: any) => {
        console.log("error", data);
        setLoading(false);
      },
      addToken: true
    });
  }, []);

  return (
    <div className="container bg-bkg-200">
      <div className='px-4 pt-4 flex justify-between'>
        <h3 className='font-semibold  text-2xl text-text-100'>All Products</h3>

        <SimpleButton
          name="+ Add Product"
          onClick={() => {
            router.push('/addNewProduct')
          }}
          width="200px"
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-row flex-wrap justify-evenly ">
          {/* {console.log('Products:', products)} */}
          {products.map((product: any, index: number) => (
            <Card
              key={index}
              product={product}
              onClick={() => {
                // console.log("this is the productId:" ,product.productId)
                router.push(`/product/${product.productId}`);
              }
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllProducts;
