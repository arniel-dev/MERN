import "./toast.css";

// eslint-disable-next-line react/prop-types
const Toast = ({ message, type }) => {
  const toastClass = `toast ${type}`;

  return (
    <div className={toastClass}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
