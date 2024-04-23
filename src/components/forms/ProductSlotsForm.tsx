import React, { useState, useEffect } from 'react'
import { InputField } from '../ui/InputFields'
import { SimpleButton } from '../ui/Buttons';
import DeleteIcon from '@mui/icons-material/Delete';
import { SubmitButton } from '../ui/Buttons';
import TimePicker from '../ui/TimePicker';

interface Slot {
    fromTime : string,
    toTime : string,
    capacity : string,
    price : string
}

function ProductSlotsForm({ formData, setFormData, currentStep, setCurrentStep, handleSubmit } : any) {
    const [slots, setSlots] = useState<Slot[]>(formData.slotData || [])
    const [error, setError] = useState("");

    const handleInputChange = (index: number, field: keyof Slot, value: string ) => {
        const updatedSlots = [...slots];
        updatedSlots[index][field] = value;
        setSlots(updatedSlots);
        setFormData({ ...formData, slotData: updatedSlots });
      };

      const handleAddSlot = () => {
        setSlots([...slots, { fromTime: '', toTime: '', capacity: '', price: '' }]);
      };

      const handleRemoveSlot = (index: number) => {
        const updatedSlots = [...slots];
        updatedSlots.splice(index, 1);
        setSlots(updatedSlots);
        setFormData({ ...formData, slotData: updatedSlots });
      };

      const bookingCategoryId = formData.bookingCategoryId;

      const checkIsNotEmpty = () => {
        let errorMessage = "";
      
        // Clear previous error message
        setError("");
      
        if (slots.length < 1) {
          errorMessage = "Please add at least one slot";
        } else {
          for (const slot of slots) {
            // if (!feature.name.trim() || !feature.description.trim()) {
            //   errorMessage = "Please fill in all feature fields";
            //   break; // Exit loop early if any field is empty
            // }
            if(!slot.fromTime || slot.fromTime==""){
              errorMessage="Please enter all fields";
              break;
            }
            if(!slot.toTime || slot.toTime== ""){
              errorMessage="Please enter all fields";
              break;
            }
            if(!slot.capacity){
              errorMessage="Please enter all fields";
              break;
            }
            if(parseInt(slot.capacity) < 1){
              errorMessage="Please enter valid Capacity";
              break;
            }
            if(!slot.price){
              errorMessage="Please enter all fields";
              break;
            }
            if(parseInt(slot.price) < 1 ){
              errorMessage="Please enter valid Price";
              break;
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
        if (slots.length === 0) {
          setSlots([{ fromTime: '', toTime: '', capacity: '', price: '' }]);
        }
      }, [formData.bookingCategoryId]);
  return (
    <div className="rounded-sm border w-4/5 sm:w-3/4 border-accent-100 bg-bkg-100 shadow-default mx-auto mt-10 shadow-md overflow-x-auto sm:rounded-lg">
      <table className='w-full'>
        <thead className='uppercase bg-bkg-300'>
          <tr>
            <th scope="col" className="px-6 py-3">{bookingCategoryId === 2 ? "Check-In Time" : "From Time"}</th>
            <th scope="col" className="px-6 py-3">{bookingCategoryId === 2 ? "Check-Out time" : "To Time"}</th>
            <th scope="col" className="px-6 py-3">Capacity</th>
            <th scope="col" className="px-6 py-3">Price</th>
            {bookingCategoryId !== 2 && (<th scope="col" className="px-6 py-3">Action</th>)}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={index} className=" border-b-2">
              <td className="px-2 py-4 sm:px-6 sm:py-4">
                {/* <InputField
                  required={true}
                  name='fromTime'
                  type='time'
                  placeholder='Enter feature Name'
                  value={feature.fromTime}
                  onChange={(e : any) => handleInputChange(index, 'fromTime', e.target.value)}
                /> */}
                {/* <input type="time" name="fromTime" value={feature.fromTime} onChange={(e : any) => handleInputChange(index, 'fromTime', e.target.value)}/> */}
                <TimePicker
                  id='fromTime'
                  name='fromTime'
                  value={slot.fromTime}
                  onChange={(e : any) => handleInputChange(index, 'fromTime', e.target.value)}
                />
              </td>
              <td className="px-2 py-4 sm:px-6 sm:py-4">
                {/* <InputField
                  required={true}
                  name='toTime'
                  type='text'
                  placeholder='Enter feature description'
                  value={feature.toTime}
                  onChange={(e : any) => handleInputChange(index, 'toTime', e.target.value)}
                /> */}
                {/* <input type="time" name="toTime" value={feature.toTime} onChange={(e : any) => handleInputChange(index, 'toTime', e.target.value)}/> */}
                <TimePicker
                  id='toTime'
                  name='toTime'
                  value={slot.toTime}
                  onChange={(e : any) => handleInputChange(index, 'toTime', e.target.value)}
                />
              </td>
              <td className="px-2 py-4 sm:px-6 sm:py-4">
                <InputField
                  required={true}
                  name='capacity'
                  type='number'
                  placeholder='Enter feature description'
                  value={slot.capacity}
                  onChange={(e : any) => handleInputChange(index, 'capacity', e.target.value)}
                />
              </td>
              <td className="px-2 py-4 sm:px-6 sm:py-4">
                <InputField
                  required={true}
                  name='price'
                  type='number'
                  placeholder='Enter feature description'
                  value={slot.price}
                  onChange={(e : any) => handleInputChange(index, 'price', e.target.value)}
                />
              </td>
              {bookingCategoryId !== 2 && (
                <td className="px-2 py-4 sm:px-6 sm:py-4 text-center">
                {/* <button onClick={() => handleRemoveFeature(index)}>Delete</button> */}
                <DeleteIcon className='hover:scale-110 hover:cursor-pointer' onClick={() => handleRemoveSlot(index)}/>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {
        bookingCategoryId !== 2 && (
          <div className='px-7 pt-2 text-accent-300 hover:text-accent-400'>
        <button className='' onClick={handleAddSlot}>+ Add Slot</button>
      </div>
        )
      }
      {error && <p className='text-xs text-red-500 text-center'>{error}</p>}
      <div className='flex gap-4 px-10 pb-4'>
      <SimpleButton
            name="previous"
            onClick={() =>{
              setCurrentStep(currentStep-1)
            }}
            />
          {/* <SimpleButton
            name="next"
            onClick={() =>{
              setCurrentStep(currentStep+1)
            }}
            /> */}
            <SubmitButton
              name='submit'
              onClick={()=>{
                if(checkIsNotEmpty()){
                  handleSubmit()
                }
              }}
            />
            </div>
    </div>
  )
}

export default ProductSlotsForm