"use client"
import React from 'react'

interface ButtonProps {
    name: string,
    onClick: () => void,
    disabled? :  boolean
    width: string
}


export const SubmitButton: React.FC<ButtonProps> = ({ name, onClick, disabled }) => {
    return (
        <button 
            className='w-full h-10 rounded-md flex items-center justify-center bg-accent-300 text-white font-semibold shadow-md hover:bg-accent-400 mx-auto mt-3' 
            onClick={onClick}
            disabled =  {disabled}
            type='submit'
        >
            {name}
        </button>
    )
}

export const SimpleButton:  React.FC<ButtonProps> = ({ name, onClick, disabled, width }) => {
    // if (!width) return null;
    // console.log(width);
    return (
        <button
            type = "button"
            className={`h-10 rounded-md flex items-center justify-center bg-accent-300 text-white font-semibold shadow-md hover:bg-accent-400`}
            style={{width : width}}
            onClick={onClick}
            disabled = {disabled}
        >
            {name}
        </button>
    )
}