import React from "react";

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
      className={`w-full bg-white disabled:hover:cursor-not-allowed hover:bg-transparent hover:border-blue-500 hover:text-blue-500 border border-blue-500 hover:scale-105 rounded-lg p-2 text-blue-500 font-semibold ${className}`}
      {...rest}
      disabled={loading}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin text-blue-500 text-xl"></i>
      ) : (
        text
      )}
    </button>
  );
};

export default OutlinedButton;
