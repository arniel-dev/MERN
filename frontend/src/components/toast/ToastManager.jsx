import React, { useContext, useState } from "react";
import Toast from "./Toast";
import { ToastContext } from "../../context/ToastContext";

const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
