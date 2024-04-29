"use client"
import React, { useState } from 'react'

interface InputFieldsWithLabelProps {
  required?: boolean
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const InputFieldWithLabel: React.FC<InputFieldsWithLabelProps> = ({
  required,
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  disabled
}) => {

  return (
    <>
      <div>
        <label className="mb-3 block text-sm font-medium text-black ">
          {label}
        </label>
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full rounded-lg border-[1.5px] border-accent-200 bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent-400 active:border-accent-400 disabled:cursor-not-allowed disabled:bg-whiter"
        />
      </div>

    </>
  )
}

interface InputFieldsProps {
  required?: boolean
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldsProps> = ({
  required,
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {

  return (
    <>
      <div>
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-sm border-[1.5px] border-accent-200 bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent-400 active:border-accent-400 disabled:cursor-default disabled:bg-whiter"
        />
      </div>

    </>
  )
}

interface TextAreaWithLabelProps {
  required?: boolean;
  label: string;
  id?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  value: string | undefined;
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export const TextAreaWithLabel: React.FC<TextAreaWithLabelProps> = ({
  required,
  label,
  id,
  rows,
  cols,
  maxLength,
  value,
  onChange
}) => {
  return (
    <div>
      <label className='mb-3 block text-sm font-medium text-black '>{label}</label>
      <textarea
      required={required}
        className="w-full rounded-lg border-[1.5px] border-accent-200 bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent-400 active:border-accent-400 disabled:cursor-default disabled:bg-whiter"
        id={id}
        rows={rows || 8}
        cols={cols || 25}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}


interface TextAreaProps {
  required?: boolean;
  name?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  value: string | undefined;
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  required,
  name,
  rows,
  cols,
  maxLength,
  value,
  onChange
}) => {
  return (
    <div>
      <textarea
      required={required}
        className="w-full rounded-lg border-[1.5px] border-accent-200 bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent-400 active:border-accent-400 disabled:cursor-default disabled:bg-whiter"
        name={name}
        rows={rows || 8}
        cols={cols || 25}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}


