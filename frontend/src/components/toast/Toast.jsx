import "./toast.css";

// eslint-disable-next-line react/prop-types
const Toast = ({ message, type, onClose }) => {
  const toastClass = `toast ${type}`;
  console.log(message, type);
  return (
    <div className={toastClass}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Toast;
