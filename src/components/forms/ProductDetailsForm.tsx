"use client";
import { useEffect, useState} from "react";
import { InputFieldWithLabel, TextAreaWithLabel } from "../ui/InputFields";
import DatePicker from "../ui/DatePicker";
import { SimpleButton } from "../ui/Buttons";
import AxiosService from "@/utils/axios/axiosService";
import { SelectGroup } from "../ui/select";

export function ProductDetailsForm({ formData, setFormData, currentStep, setCurrentStep }: any) {

  
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(
    formData.productCategoryId !== 0
  );
  const [selectedId, setSelectedId] = useState<number>(
    formData.productCategoryId !== 0 ? formData.productCategoryId : -1
  );
  const [error, setError] = useState<string>("");
  // const [selectedOption, setSelectedOption] = useState<string>(
  //   productCategoryOptions[formData.productCategoryId].name;
  // );
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [productCategoryOptions, setProductCategoryOptions] = useState<Array<{ id: number, name: string }>>([]);

  const changeTextColor = () => {
    setIsOptionSelected(true);
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    AxiosService.get('product/getAllCategories/',{
      success : (data : any) => {
        console.log("success",data);
        const responseOptions = data.categories.map((item: any) => {
          return {
              id: item.productCategoryId,
              name: item.categoryName
          }
      })
      setProductCategoryOptions(responseOptions);
      setSelectedOption(
        formData.productCategoryId !== 0
          ? responseOptions.find((option : any) => option.id === formData.productCategoryId)?.name || ''
          : ''
      );
      },
      failed : (data : any) => {
        console.log("failed", data)
      },
      error : (data: any) => {
        console.log("error", data)
      },
      addToken: true,
    })
  }, [])

  const checkIsNotEmpty = () => {
    const emptyFields = [];
  
    if (!formData.productName || formData.productName == "") {
      emptyFields.push("Product Name");
    }
    if (!formData.productDescription || formData.Description == "") {
      emptyFields.push("Description");
    }
    if (!formData.productCategoryId || formData.productCategoryId == 0) {
      emptyFields.push("Product Category");
    }
    if (!formData.advanceBookingDuration || formData.advanceBookingDuration < 1) {
      emptyFields.push("Advance Booking Duration cannot be empty and less than one");
    }
    if (!formData.active_fromDate || formData.active_fromDate == "") {
      emptyFields.push("Active from Date");
    }
    if (!formData.active_toDate || formData.active_toDate == "") {
      emptyFields.push("Active to Date");
    }
  
    if (emptyFields.length === 0) {
      return true; // All required fields are not empty
    } else {
      // console.log("Empty fields:", emptyFields.join(", "));
      setError(emptyFields.join(", ").concat(" cannot be empty"));
      return false; // At least one required field is empty
    }
  };
  
  



  return (
    <div className="rounded-sm border w-4/5 sm:w-3/4 border-accent-100 bg-bkg-100 shadow-default p-4 mx-auto mt-10 shadow-md flex gap-3 flex-col">
        <InputFieldWithLabel
          required={true}
          label={"Product Name"}
          id={"productName"}
          type={"text"}
          placeholder={"Enter Product name"}
          value={formData.productName}
          onChange={handleInputChange}
        />
        {/* <InputFieldWithLabel
          required={true}
          label={"Product capacity"}
          id={"productCapacity"}
          type={"number"}
          placeholder={"Enter Product capacity"}
          value={formData.productCapacity}
          onChange={handleInputChange}
        /> */}
        <SelectGroup
          // label="choose Product Category"
          // options={productCategoryOptions}
          // onChange={(e) => {
          //   const selectedCategory = parseInt(e.target.value);
          //   setSelectedOption(e.target.value);
          //   // formData.productCategoryId = parseInt(e.target.options[e.target.selectedIndex].id);
          //   setFormData((prev : any) => ({ ...prev, productCategoryId: selectedCategory }))
          //   setSelectedId(parseInt(e.target.options[e.target.selectedIndex].id));
          //   changeTextColor()
          // }}
          // value={selectedOption}
          // isOptionSelected={isOptionSelected}
          // required={true}
          label="Choose Product Category"
        options={productCategoryOptions}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          const selectedCategoryId = parseInt(e.target.options[e.target.selectedIndex].id);
          setSelectedId(selectedCategoryId);
          console.log("selectedCategoryId", selectedCategoryId)
          setFormData((prev : any) => ({ ...prev, productCategoryId: selectedCategoryId }));
          changeTextColor();
        }}
        value={selectedOption}
        isOptionSelected={isOptionSelected}
        required={true}
        />
        <TextAreaWithLabel
        required={true}
          label="Description"
          id="productDescription"
          value={formData.productDescription}
          onChange={handleInputChange}
        />
        <InputFieldWithLabel
        required={true}
          label="Advance Booking Duration"
          id="advanceBookingDuration"
          type="number"
          placeholder="Number of days in advance bookings are allowed."
          value={formData.advanceBookingDuration}
          onChange={handleInputChange}
        />
      <DatePicker
      required={true}
      label="Active from Date"
        id="active_fromDate"
        value={formData.active_fromDate}
        onChange={handleInputChange}
      />
      <DatePicker
      required={true}
      label="Active to Date"
        id="active_toDate"
        value={formData.active_toDate}
        onChange={handleInputChange}
      />
      {error && <p className="text-xs text-red-500 mx-auto">{error}</p>}
      <SimpleButton
        name = "Next"
        onClick={()=> {
          if(checkIsNotEmpty()){
            setCurrentStep(currentStep + 1)
          }
        }}
      />
    </div>
  );
}
