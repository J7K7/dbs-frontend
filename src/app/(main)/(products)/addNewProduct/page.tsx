"use client"
import React, { useEffect, useState } from 'react'
import { ProductDetailsForm } from '@/components/forms/ProductDetailsForm'
import ProductFeaturesForm from '@/components/forms/ProductFeaturesForm'
import ProductImagesForm from '@/components/forms/ProductImagesForm'
import ProductSlotsForm from '@/components/forms/ProductSlotsForm'
import AxiosService from '@/utils/axios/axiosService'
import { toast } from 'react-toastify'
import Loading from '@/components/ui/Loading'
import { useAppSelector, useAppStore } from '@/lib/hook'
import { RootState } from '@/lib/store'

interface FormData {
  productName: string;
  productCapacity: number ;
  productDescription: string;
  advanceBookingDuration: number | null;
  active_fromDate: string;
  active_toDate: string;
  featureData: any[];
  productImages: File[];
  slotData: any[];
  bookingCategoryId: number;
  productCategoryId: number;
  [key: string]: any; // Adding index signature
}

function AddNewProduct() {
  const initialFormData = {
    productName : "",
    productCapacity : 1,
    productDescription: "",
    advanceBookingDuration : null,
    active_fromDate : "",
    active_toDate : "",
    featureData : [],
    productImages: [] as File[],
    slotData : [],
    bookingCategoryId:0,
    productCategoryId:0
  }
  const [formData, setFormData] = useState<FormData>(initialFormData)



  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // useEffect(() => {

  //     const bookingCategoryId = useAppSelector((state : RootState) => state.booking.categoryId) || 0
  //     console.log("bookingCategoryId",bookingCategoryId);
  //     setFormData(
  //       {
  //         ...formData,
  //         bookingCategoryId: bookingCategoryId 
  //       }
  //     )
  // }, [])



  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setloading] = useState(false);
  const bookingCategoryId = useAppSelector((state: RootState) => state.booking.categoryId) || 0;

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    console.log("handle submit triggered")
    console.log("submitted data", formData);
    setloading(true);
    const formDataToSend = new FormData();
    for (const key in formData) {
      if(key === "featureData" || key === "slotData"){
        formDataToSend.append(
          `${key}`,
          JSON.stringify(formData[key])
        )
      }
      else if(key === "productImages"){
        for(let i=0; i< formData[key].length ; ++i){
          formDataToSend.append("productImages", formData[key][i]);
        }
      }
      else {
        formDataToSend.append(key, formData[key]);
      }
    }

    // console.log("formDataToSend", formDataToSend)
    for (const [key, value] of formDataToSend) {
      // output.textContent += `${key}: ${value}\n`;
      console.log(`${key}: ${value}`)
    }
    AxiosService.post(
      "product/addProduct/",
      {
        formData: formDataToSend,
        success: (data: any) => {
          // console.log("successfull", data);
          setloading(false)
          toast.success(data.msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              // draggable: true,
              progress: undefined
          })
          setFormData(initialFormData);
          setCurrentStep(1);
        },
        failed: (data: any) => {
          // console.log(data.msg, data);
          setloading(false)
          toast.error(data.msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              // draggable: true,
          });
        },
        error: (data: any) => {
          // console.log(<data className="message"></data>, data);
          setloading(false)
          toast.error(data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              // draggable: true,
          });
        },
        addToken: true,
        addMultipartForm: true,
      },
    );
  };

  useEffect(() => {
    // console.log("bookingCategoryId", bookingCategoryId);
    setFormData({
      ...formData,
      bookingCategoryId: bookingCategoryId 
    });
  }, [bookingCategoryId]);

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductDetailsForm
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep= {setCurrentStep}
        />
        )
      case 2:
        return(
          <ProductFeaturesForm
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep= {setCurrentStep}
          />
        )
      case 3:
        return(
          <ProductImagesForm
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep= {setCurrentStep}
          />
        )
      case 4:
        return (
          <ProductSlotsForm
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep= {setCurrentStep}
          handleSubmit={handleSubmit}
          />
        )
      default:
        break;
    }
  }



  return (
    <>
    <h1 className='text-center mt-10'>{currentStep}/4</h1>
    {/* <form onSubmit={handleSubmit}> */}
      {renderForm()}
    {/* </form> */}
    {loading && <Loading />}
    </>
  )
}

export default AddNewProduct