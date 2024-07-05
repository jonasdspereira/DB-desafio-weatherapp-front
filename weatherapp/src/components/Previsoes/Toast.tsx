import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = ({
  type,
  message,
}: {
  type: "success" | "warn" | "error" | "info",
  message: string,
}) => {
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
