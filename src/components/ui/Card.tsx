import React from 'react'
import { imageURL } from '@/utils/common/common';

function Card({product, onClick} : any) {
    const { images , productName, productDescription, features } = product;
    // const imageSrc = ``
    // console.log("product imagePath",images[0]?.imagePath)
    // const imageSrc = `http://localhost:3000/images/${images[0]?.imagePath}`
    const imageSrc = imageURL(images[0]?.imagePath)
    return (
        <div className="w-[18rem] bg-white shadow-lg rounded-lg overflow-hidden m-4 hover:scale-105 hover:cursor-pointer hover:shadow-xl hover:outline-2 hover:outline-gray-900"
        onClick={onClick}
        >
          <img className="w-full h-56 object-cover object-center" src={imageSrc} alt="Product" />
          <div className="p-4">
            <h2 className="text-gray-900 font-semibold text-xl mb-2">{productName}</h2>
            <div className='h-[7.8rem] overflow-clip'>
            <p className="text-gray-700">{productDescription}</p>
            </div>
            <div className="mt-4">
              {/* <h3 className="text-gray-900 font-semibold">Features:</h3> */}
              <ul className="list-disc list-inside text-gray-700 flex flex-row flex-wrap ">
                {features.map((feature : any, index : any) => (
                  <li className="whitespace-nowrap mr-2" key={index}><p className='text-xs inline ml-[-10px]'>{feature.featureName}</p></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
}

export default Card