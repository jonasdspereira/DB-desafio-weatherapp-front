import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  type: "success" | "warn" | "error" | "info";
  message: string;
}

export const showToast = ({ type, message }: ToastProps) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast.info(message);
  }
};

const ToastAnimated: React.FC = () => {
  return <ToastContainer />;
};

export default ToastAnimated;
