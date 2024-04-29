import React, { useEffect, useState } from "react";
import { SimpleButton } from "../ui/Buttons";

function ProductImagesForm({
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
  isModalMode,
}: any) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  let files;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    files = Array.from(e.target.files || []);
    setFormData({
      ...formData,
      productImages: files,
    });

    // Generate preview URLs for selected images
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);
  };
  const [error, setError] = useState("");

  const checkIsImageSelected = () => {
    if (formData.productImages.length === 0) {
      setError("Please select at least one image.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    files = formData.productImages;
    const urls = files.map((file: any) => URL.createObjectURL(file));
    setPreviewImages(urls);
  }, []);

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...formData.productImages];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      productImages: updatedImages,
    });

    // Remove preview image URL
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  return (
    <div className="rounded-sm border w-4/5 sm:w-3/4 p-4 border-accent-100 bg-bkg-100 shadow-default mx-auto mt-10 shadow-md overflow-x-auto sm:rounded-lg">
      <label className="mb-3 block text-sm font-medium text-black ">
        Product Images:
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      {/* Render preview images */}
      <div className="mt-3 flex flex-wrap gap-4">
        {previewImages.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Preview ${index}`}
              className="w-32 h-32 object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full text-xs"
              onClick={() => handleDeleteImage(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      <div className="flex justify-center gap-4 px-10 pb-4">
        {!isModalMode && (
          <>
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
                if (checkIsImageSelected()) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              width="200px"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductImagesForm;
