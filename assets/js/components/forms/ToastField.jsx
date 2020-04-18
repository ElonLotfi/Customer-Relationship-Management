import { toast } from "react-toastify";

function Toast(message) {
  return toast.success("🦄 " + message, {
    position: "bottom-left",
    autoClose: 4923,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
}

export default {
  Toast
};
