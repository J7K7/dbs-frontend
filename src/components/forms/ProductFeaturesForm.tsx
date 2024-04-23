// import React, { useCallback, useState } from "react";
// import { InputField, TextArea } from "../ui/InputFields";
// import { SimpleButton } from "../ui/Buttons";

// interface Row {
//   name: string;
//   description: string;
// }

// interface TableState {
//   rows: Row[];
// }

// function ProductFeaturesForm({formData, setFormData, currentStep, setCurrentStep} : any) {
//   const [tableState, setTableState] = useState<TableState>({ rows: [] });

//   const addRow = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     setTableState({
//       ...tableState,
//       rows: [...tableState.rows, { name: "", description: "" }],
//     });
//   };

//   // const handleInputChange = useCallback(
//   //   (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//   //     const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
//   //     if (event.target instanceof HTMLInputElement) {
//   //       setTableState({
//   //         ...tableState,
//   //         rows: tableState.rows.map((row, i) =>
//   //           i === index ? { ...row, [name]: value } : row
//   //         ),
//   //       });
//   //     } else if (event.target instanceof HTMLTextAreaElement) {
//   //       setTableState({
//   //         ...tableState,
//   //         rows: tableState.rows.map((row, i) =>
//   //           i === index ? { ...row, [name]: value } : row
//   //         ),
//   //       });
//   //     }
//   //   },
//   //   [tableState]
//   // );

//   const handleInputChange = useCallback(
//     (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
//       if (event.target instanceof HTMLInputElement) {
//         setTableState({
//           ...tableState,
//           rows: tableState.rows.map((row, i) =>
//             i === index ? { ...row, [name]: value } : row
//           ),
//         });
//         setFormData((prev: any) => ({
//           ...prev,
//           featureData: tableState.rows.map((row) => ({
//             name: row.name,
//             description: row.description,
//           })),
//         }));
//       } else if (event.target instanceof HTMLTextAreaElement) {
//         setTableState({
//           ...tableState,
//           rows: tableState.rows.map((row, i) =>
//             i === index ? { ...row, [name]: value } : row
//           ),
//         });
//         setFormData((prev: any) => ({
//           ...prev,
//           featureData: tableState.rows.map((row) => ({
//             name: row.name,
//             description: row.description,
//           })),
//         }));
//       }
//     },
//     [tableState, setFormData]
//   );

//   // const handleSubmit = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//   //   e.preventDefault();
//   //   const data = tableState.rows.map((row) => ({
//   //     name: row.name,
//   //     description: row.description,
//   //   }));
//   //   setFormData((prev : any) => (
//   //       {
//   //           ...prev,
//   //           featureData: data
//   //       }
//   //   ))
//   //   // console.log("Submitted data:", data);
//   // };

//   return (
//     <div className="rounded-sm border w-4/5 sm:w-3/4 border-accent-100 bg-bkg-100 shadow-default p-4 mx-auto mt-10 shadow-md">
//       <form className="flex gap-3 flex-col">
//         <div>
//           <button onClick={(e) => addRow(e)}>+</button>
//           <table>
//             <thead>
//               <tr>
//                 <th>Feature Name</th>
//                 <th>Feature Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableState.rows.map((row, index) => (
//                 <tr key={index}>
//                   <td>
//                     {/* <input
//                       name="name"
//                       value={row.name}
//                       onChange={(e) => handleInputChange(index, e)}
//                     /> */}
//                     <InputField
//                       required={true}
//                       name="name"
//                       type="text"
//                       placeholder="Enter feature Name:"
//                       value={row.name}
//                       onChange={(e) => handleInputChange(index, e)}
//                     />
//                   </td>
//                   <td>
//                     {/* <input
//                       name="description"
//                       value={row.description}
//                       onChange={(e) => handleInputChange(index, e)}
//                     /> */}
//                     <TextArea
//                       name= "description"
//                       value={row.description}
//                       onChange={(e) => handleInputChange(index, e)}
//                       rows={2}
//                       cols={25}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* <button onClick={(e) => handleSubmit(e)}>Submit</button> */}
//           <div className="flex gap-1">
//           <SimpleButton
//             name="previous"
//             onClick={() =>{
//               setCurrentStep(currentStep-1)
//             }}
//           />
//           <SimpleButton
//             name="next"
//             onClick={() =>{
//               setCurrentStep(currentStep+1)
//             }}
//           />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProductFeaturesForm;



















import { useState, useEffect } from 'react';
import { InputField, TextArea } from '../ui/InputFields';
import { SimpleButton } from '../ui/Buttons';
import DeleteIcon from '@mui/icons-material/Delete';

interface Feature {
  name: string;
  description: string;
}

const ProductFeaturesForm = ({ formData, setFormData, currentStep, setCurrentStep } : any) => {
  const [features, setFeatures] = useState<Feature[]>(formData.featureData || []);

  const handleInputChange = (index: number, field: keyof Feature, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
    setFormData({ ...formData, featureData: updatedFeatures });
  };

  const [error, setError] = useState("");

  const handleAddFeature = () => {
    setFeatures([...features, { name: '', description: '' }]);
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
    setFormData({ ...formData, featureData: updatedFeatures });
  };
  // const checkIsNotEmpty = () => {
  //   let errorMessage = "";
  //   setError("")
  //   if (features.length < 1) {
  //     setError(error.concat("Please add at least one feature"))
  //     return false;
  //   }else{
  //     for (const feature of features) {
  //       if (!feature.name.trim() || !feature.description.trim()) {
  //         setError(error.concat("Please fill in all feature fields"));
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

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
  

  useEffect(() => {
    if (features.length === 0) {
      setFeatures([{ name: '', description: '' }]);
    }
  }, []);

  return (
    <div className="rounded-sm border w-4/5 sm:w-3/4 border-accent-100 bg-bkg-100 shadow-default mx-auto mt-10 shadow-md overflow-x-auto sm:rounded-lg">
      <table className='w-full'>
        <thead className='uppercase bg-bkg-300'>
          <tr>
            <th scope="col" className="px-6 py-3">Feature Name</th>
            <th scope="col" className="px-6 py-3">Feature Description</th>
            <th scope="col" className="px-6 py-3">Action</th>
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
                  name='name'
                  type='text'
                  placeholder='Enter feature Name'
                  value={feature.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
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
                  name='description'
                  type='text'
                  placeholder='Enter feature description'
                  value={feature.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </td>
              <td className="px-6 py-4 text-center">
                {/* <button onClick={() => handleRemoveFeature(index)}>Delete</button> */}
                <DeleteIcon className='hover:scale-110 hover:cursor-pointer' onClick={() => handleRemoveFeature(index)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='px-7 pt-2 text-accent-300 hover:text-accent-400'>
        <button className='' onClick={handleAddFeature}>+ Add Feature</button>
      </div>
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      <div className='flex gap-4 px-10 pb-4'>
      <SimpleButton
            name="previous"
            onClick={() =>{
              setCurrentStep(currentStep-1)
            }}
            />
          <SimpleButton
            name="next"
            onClick={() =>{
              if(checkIsNotEmpty()){
                setCurrentStep(currentStep+1)
              }
            }}
            />
            </div>
    </div>
  );
};

export default ProductFeaturesForm;
