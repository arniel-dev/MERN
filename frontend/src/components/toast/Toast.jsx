import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import "./toast.css";

// eslint-disable-next-line react/prop-types
const Toast = ({ message, type }) => {
  return (
    <Box sx={{ marginTop: 2, width: "100%" }}>
      <Alert className="toast" severity={type}>
        {message}
      </Alert>
    </Box>
  );
};

export default Toast;
