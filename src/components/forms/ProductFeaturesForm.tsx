import { useState, useEffect } from "react";
import { InputField, TextArea } from "../ui/InputFields";
import { SimpleButton } from "../ui/Buttons";
import DeleteIcon from "@mui/icons-material/Delete";
import AxiosService from "@/utils/axios/axiosService";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";
import Link from "next/link";

interface Feature {
  featureId: string;
  name: string;
  description: string;
}

const ProductFeaturesForm = ({
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
  isUpdateMode,
  isModalMode
}: any) => {
  // console.log("featureData", formData)
  const [features, setFeatures] = useState<Feature[]>(
    formData.featureData?.length > 0
      ? formData.featureData
      : [{ name: "", description: "" }]
  );

  const handleInputChange = (
    index: number,
    field: keyof Feature,
    value: string
  ) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
    setFormData({ ...formData, featureData: updatedFeatures });
  };

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFeature = () => {
    setFeatures([...features, { name: "", description: "", featureId: "" }]);
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
    setFormData({ ...formData, featureData: updatedFeatures });
  };

  const checkIsNotEmpty = () => {
    let errorMessage = "";

    // Clear previous error message
    setError("");

    if (features.length < 1) {
      errorMessage = "Please add at least one feature";
    } else {
      for (const feature of features) {
        if (!feature.name.trim() || !feature.description.trim()) {
          errorMessage = "Please fill in all feature fields";
          break; // Exit loop early if any field is empty
        }
      }
    }

    // Set error message if any field is empty
    if (errorMessage) {
      setError(errorMessage);
      return false;
    }

    return true;
  };

  const handleUpdate = (featureId: any) => {
    setIsLoading(true);
    console.log("update button pressed", featureId);
    console.log(
      "updated feature",
      formData.featureData.find(
        (feature: any) => feature.featureId === featureId
      )
    );
    let data = formData.featureData.find(
      (feature: any) => feature.featureId === featureId
    );
    delete data.featureId;
    console.log("data after deletion", data);
    AxiosService.put(`product/updateFeature/${featureId}`, {
      success: (data: any) => {
        console.log("data after update", data);
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
        console.log("failed", data);
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
        console.log("error", data);
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
      data: data,
      addToken: true,
      addFormEncode: true,
    });
  };

  const handleDeletefeature = (index: any, featureId: any) => {
    setIsLoading(true);
    handleRemoveFeature(index);
    AxiosService.delete(`product/deleteFeature/${featureId}`, {
      success: (data: any) => {
        console.log("success", data);
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
        console.log("failed", data);
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
        console.log("error", data);
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

  return (
    <>
      <div className="rounded-sm border w-4/5 sm:w-3/4 border-accent-100 bg-bkg-100 shadow-default mx-auto mt-10 shadow-md overflow-x-auto sm:rounded-lg">
        <table className="w-full">
          <thead className="uppercase bg-bkg-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Feature Name
              </th>
              <th scope="col" className="px-6 py-3">
                Feature Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className=" border-b-2">
                <td className="px-6 py-4">
                  {/* <input
                  type="text"
                  value={feature.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                /> */}
                  <InputField
                    required={true}
                    name="name"
                    type="text"
                    placeholder="Enter feature Name"
                    value={feature.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td className="px-6 py-4">
                  {/* <input
                  type="text"
                  value={feature.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                /> */}
                  {/* <TextArea
                  name='description'
                  rows={1}
                  cols={25}
                  value={feature.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                /> */}
                  <InputField
                    required={true}
                    name="description"
                    type="text"
                    placeholder="Enter feature description"
                    value={feature.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  {isUpdateMode ? (
                    <div className="flex gap-2">
                      <SimpleButton
                        name="update"
                        onClick={() => handleUpdate(feature.featureId)}
                        width="100px"
                      />
                      <SimpleButton
                        name="remove"
                        onClick={() =>
                          handleDeletefeature(index, feature.featureId)
                        }
                        width="100px"
                      />
                    </div>
                  ) : (
                    <DeleteIcon
                      className="hover:scale-110 hover:cursor-pointer"
                      onClick={() => handleRemoveFeature(index)}
                    />
                  )}
                  {/* <button onClick={() => handleRemoveFeature(index)}>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isUpdateMode ? (
          <div className="flex justify-center py-2">
            {/* <SimpleButton
              name="Add Features"
              onClick={() => {}}
              width="150px"
            /> */}
          </div>
        ) : (
          <div className="px-7 pt-2 text-accent-300 hover:text-accent-400">
            <button className="" onClick={handleAddFeature}>
              + Add Feature
            </button>
          </div>
        )}
        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
        {(!isUpdateMode && !isModalMode) && (
          <div className="flex gap-6 justify-center pb-4">
            <SimpleButton
              name="previous"
              onClick={() => {
                setCurrentStep(currentStep - 1);
              }}
              width="200px"
            />
            <SimpleButton
              name="next"
              onClick={() => {
                if (checkIsNotEmpty()) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              width="200px"
            />
          </div>
        )}
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default ProductFeaturesForm;
