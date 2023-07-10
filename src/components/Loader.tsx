import React, { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10 w-screen h-screen flex items-center justify-center bg-opacity-75 bg-gray-300">
      <div className="bg-white z-50 h-20 w-20 rounded-lg flex justify-center items-center">
        <i className="fas fa-spinner fa-spin text-purple-500 text-5xl"></i>
      </div>
    </div>
  );
};

export default Loader;
