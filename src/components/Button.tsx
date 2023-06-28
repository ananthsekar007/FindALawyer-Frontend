import React from "react";

interface TextFieldProps
  extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
  text: string;
}

const Button = ({ loading, text, ...rest }: TextFieldProps) => {
  return (
    <button className="w-full bg-gradient-to-br from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 hover:scale-105 rounded-lg p-2 text-white" {...rest}>
      {text}
    </button>
  );
};

export default Button;
