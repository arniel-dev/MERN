// src/context/ToastContext.js
import { createContext, useState } from "react";
import ToastContainer from "../components/toast/ToastManager";

export const ToastContext = createContext();

// eslint-disable-next-line react/prop-types
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const newToast = { id: Date.now(), message, type };
    setToasts([...toasts, newToast]);
  };
  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, toasts, removeToast }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
