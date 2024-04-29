"use client"
import { useEffect, useState } from "react"
import AxiosService from "@/utils/axios/axiosService"
import ProductFeaturesForm from "@/components/forms/ProductFeaturesForm"
import Loading from "@/components/ui/Loading"
import Modal from "@/components/ui/Modal"
import { SimpleButton } from "@/components/ui/Buttons"
import { toast } from "react-toastify"

interface Feature {
    name: string;
    description: string;
  }

export default function Features({ params } : { params : {productId : string}}) {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addFeaturesData, setAddFeaturesData] = useState<{ featureData: Feature[] }>({ featureData: [] });
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    //   useEffect(()=>{
    //     console.log("addfeaturedata",addFeaturesData);
    //   }, [addFeaturesData])

    useEffect(()=> {
        setIsLoading(true);
        AxiosService.get(`product/getProductDetails/${params.productId}`,{
            success : (data : any) => {
                console.log("success", data)

                const dataToSend = data.productData;
                const updateData = {
                    ...dataToSend,
                    featureData : dataToSend.features
                }
                delete updateData.features;
                for(let i=0; i<updateData.featureData.length; ++i){
                    updateData.featureData[i].name = updateData .featureData[i].featureName;
                    delete updateData.featureData[i].featureName;
                    updateData.featureData[i].description = updateData .featureData[i].featureDescription;
                    delete updateData.featureData[i].featureDescription;
                }
                setFormData(updateData);
                console.log("updatedData", updateData)
                setIsLoading(false)
            },
            failed : (data : any) => {
                console.log("failed", data)
                setIsLoading(false)
            },
            error : (data : any) => {
                console.log("error", data)
                setIsLoading(false)
            },
            addToken : true
        })
    }, [])


    const handleAddFeature = () => {
        console.log("addFeatujreDAta",addFeaturesData);
        const data = {
            featureData: JSON.stringify(addFeaturesData.featureData),
            productId: params.productId
        }
        console.log("data to send", data);
        setIsLoading(true);
        AxiosService.post('product/addFeature',{
            success: (data : any) => {
                console.log("successfull in adding new features",data);
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
            failed: (data : any) => {
                console.log("failed in adding new Features", data);
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
            error : (data : any) => {
                console.log("error in adding new features", data);
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
            data : data,
            addToken: true,
            addFormEncode : true
        })
    }

    return (
        <>
        {
            isLoading ? (
                <Loading />
            ) : (
                <> 
                <h1>Product Features for ProductId: {params.productId}</h1>
                <SimpleButton 
                    onClick={handleOpenModal } 
                    name="Add Features"
                    width="200px"
                />
                {/* <SimpleButton
                    name="add Featuresw"
                    onClick={()=> { SetIsModalOpen(true)}}
                    width="200px"
                /> */}
            <ProductFeaturesForm 
                formData={formData}
                setFormData={setFormData}
                isUpdateMode= {true}
                />
                 
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* Content of your modal */}
        
        <ProductFeaturesForm
            formData={addFeaturesData}
            setFormData={setAddFeaturesData}
            isModalMode={true}
        />
        <div className="flex justify-center pt-4 gap-4">
            <SimpleButton 
                name="Add"
                onClick={handleAddFeature}
                width="150px"
            />
        <SimpleButton 
            name="Close"
            onClick={handleCloseModal}
            width="150px"
            />
            </div>
      </Modal>
                </>
            )
        }
            
        </>
    )
}