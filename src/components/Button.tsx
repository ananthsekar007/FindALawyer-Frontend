import React from "react";

interface TextFieldProps
  extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
  text: string;
}

const Button = ({ loading, text, className, ...rest }: TextFieldProps) => {
  return (
    <button
      className={`w-full bg-gradient-to-br disabled:hover:cursor-not-allowed from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 hover:scale-105 rounded-lg p-2 text-white ${className}`}
      {...rest}
      disabled={loading}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin text-white text-xl"></i>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
