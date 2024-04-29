"use client";
import { useEffect, useState } from "react";
import AxiosService from "@/utils/axios/axiosService";
import { imageURL } from "@/utils/common/common";
import Image from "next/image";
import { SimpleButton } from "@/components/ui/Buttons";
import { toast } from "react-toastify";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import ProductImagesForm from "@/components/forms/ProductImagesForm";

interface FormData {
    productImages?: Array<any>;
}

export default function Images({ params }: { params: { productId: string } }) {
  const [formData, setFormData] = useState<FormData>({ productImages: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addImageData, setAddImageData] = useState<FormData>({ productImages: [] });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

//   useEffect(()=> {
//     console.log("imageData", addImageData);
//   }, [addImageData])

  useEffect(() => {
    setIsLoading(true);
    AxiosService.get(`product/getProductDetails/${params.productId}`, {
      success: (data: any) => {
        console.log("success", data);
        const dataToSend = data.productData;
        const updateData = {
          productImages: dataToSend.images,
        };
        delete dataToSend.images;
        setFormData(updateData);
        setIsLoading(false);
      },
      failed: (data: any) => {
        console.log("failed", data);
        setIsLoading(false);
      },
      error: (data: any) => {
        console.log("error", data);
        setIsLoading(false);
      },
      addToken: true,
    });
  }, []);

//   useEffect(()=> {
//     console.log(formData);
//   }, [formData])

  const deleteimage = (imageId: string) => {
    setIsLoading(true);
    AxiosService.delete(`product/deleteImage/${imageId}`, {
      success: (data: any) => {
        console.log("SUCCESFU8LL DELETED", data);
        toast.success(data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          // draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          setIsLoading(false);
          window.location.reload();
        }, 1000);
      },
      failed: (data: any) => {
        console.log("failed in deleting image", data);
        toast.error(data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          // draggable: true,
        });
        setIsLoading(false);
      },
      error: (data: any) => {
        console.log("error in deleting image", data);
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          // draggable: true,
        });
        setIsLoading(false);
      },
      addToken: true,
    });
  };

  const handleAddImage = () => {
    // if (imageFile   && imageFile.length > 0) {
    //   setIsLoading(true);
    //   const formData    = new FormData();
    //   formData.append("productId", params.productId);
    //   formData.append("image", imageFile[0]);

    //   const request 
    //   request({
    //     url: "/product/add-image",
    //     method: "POST",
    //     data: formData,
    //    onSuccess: (
    //     data: any
    //     toast.  
    setIsLoading(true);
    const formDataToSend = new FormData;
    for(const image of addImageData.productImages ?? []){
        formDataToSend.append("productImages", image);
    }
    formDataToSend.append("productId", params.productId);
    for (const [key, value] of formDataToSend) {
        // output.textContent += `${key}: ${value}\n`;
        console.log(`${key}: ${value}`)
      }
      AxiosService.post(`product/addImage`,{
        success: (data : any) => {
            console.log("successfully added image", data);
            toast.success(data.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                // draggable: true,
                progress: undefined
            })
            setTimeout(()=> {
                window.location.reload();
                setIsLoading(false);
            }, 1000);
        },
        failed: (data : any) => {
            console.log("failed to add image", data);
            toast.error(data.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                // draggable: true,
            });
            setIsLoading(false);
        },
        error: (data : any) => {
            console.log('ERROR IN ADDING IMAGE', data);
            toast.error(data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                // draggable: true,
            });
            setIsLoading(false);
        },
        formData : formDataToSend,
        addToken: true,
        addMultipartForm: true
      })
  }

  return (
    <>
      <div className="container bg-bkg-200 min-h-screen flex flex-col items-center">
        <h1>Product Images for ProductId: {params.productId}</h1>
        <SimpleButton
          name="+ Add Image"
          onClick={handleOpenModal}
          width="120px"
        />
        { isLoading ? (<Loading/>):(
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 ">
              {
              formData.productImages?.map((image: any, index: number) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden m-4 hover:scale-105 hover:cursor-pointer hover:shadow-xl hover:outline-2 hover:outline-gray-900 flex flex-col gap-2 items-center pb-3"
                >
                  <Image
                    src={imageURL(image.imagePath)}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                  <SimpleButton
                    name="Delete"
                    onClick={
                      () => deleteimage(image.imageId)
                    }
                    width="120px"
                  />
                </div>
              ))
              }
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              {/* Content of your modal */}
              <ProductImagesForm
                formData={addImageData}
                setFormData={setAddImageData}
                isModalMode={true}
              />
              <div className="flex justify-center pt-4 gap-4">
              <SimpleButton
                name="Add Image"
                onClick={handleAddImage}
                width="150px"
                />
              <SimpleButton 
            name="Close"
            onClick={handleCloseModal}
            width="150px"
            />
            </div>
            </Modal>
          </div>
        )}
        {isLoading && <Loading />}
      </div>
    </>
  );
}
