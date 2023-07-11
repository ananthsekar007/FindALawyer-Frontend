import { toast } from "react-toastify";

export const showSuccessMessage = (message: string) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: "success",
  });
};

export const showErrorMessage = (message: string) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: "error",
  });
};
