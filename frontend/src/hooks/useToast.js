// src/hooks/useToast.js
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const useToast = () => {
  const { addToast } = useContext(ToastContext);

  const showToast = (message, type = "info") => {
    addToast(message, type);
  };

  return { showToast };
};

export default useToast;
