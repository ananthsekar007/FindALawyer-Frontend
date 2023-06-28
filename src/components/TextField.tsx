import React from "react";

interface TextFieldProps
  extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  label: string;
  id: string | undefined;
  name: string;
}

const Textfield = ({ id, label, name, ...rest }: TextFieldProps) => {
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
          id={id}
          name={name}
          {...rest}
          className="p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Textfield;
