import React from "react";
import { RegisterOptions } from "react-hook-form";

interface TextFieldProps
  extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  name: string;
  label: string;
  register: any;
  errors?: any;
  validationSchema?: RegisterOptions;
}

const TextField = ({ id, label, name, errors, register, validationSchema, ...rest }: TextFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          {...register(name, validationSchema)}
          {...rest}
          className="p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {errors[name] && (
        <span className="text-xs text-red-500 font-semibold">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default TextField;
