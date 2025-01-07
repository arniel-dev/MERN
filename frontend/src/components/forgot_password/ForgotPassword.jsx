import React, { useEffect, useState } from "react";

import { TextField, Button, Box, Typography } from "@mui/material";
import useAxiosPost from "../../api/useAxiosPost";
import useToast from "../../hooks/useToast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setURL, setRequest, status, response, cleanUp, resErrMsg } =
    useAxiosPost();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 200) {
      showToast(response?.message, "success");
      cleanUp();
      setLoading(false);
    }
    if (resErrMsg) {
      showToast(resErrMsg?.response?.data?.message, "error");
      cleanUp();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, resErrMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setURL("api/users/forgot-password");
    setRequest({ email });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ padding: 1.5 }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPassword;
