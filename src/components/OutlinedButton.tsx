import React, { CSSProperties } from "react";

interface OutlinedButtonProps
  extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
  text: string;
}

const OutlinedButton = ({
  loading,
  text,
  className,
  ...rest
}: OutlinedButtonProps) => {
  return (
    <button
      className={`w-full bg-white hover:bg-transparent hover:border-blue-500 hover:text-blue-500 border border-blue-500 hover:scale-105 rounded-lg p-2 text-blue-500 font-semibold ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default OutlinedButton;
