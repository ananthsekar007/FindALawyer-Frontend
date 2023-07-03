import React, { useEffect } from "react";
import { RegisterOptions } from "react-hook-form";

interface OptionProps {
  value: string;
  label: string;
}

interface SelectProps
  extends Partial<React.SelectHTMLAttributes<HTMLSelectElement>> {
  name: string;
  label: string;
  register: any;
  errors?: any;
  validationSchema?: RegisterOptions;
  options: OptionProps[];
}

const Select = ({
  id,
  label,
  options,
  validationSchema,
  register,
  name,
  errors,
  ...rest
}: SelectProps) => {
  useEffect(() => {
    console.log("inside select useEffect", name);
  }, []);

  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        {...register(name, validationSchema)}
        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
