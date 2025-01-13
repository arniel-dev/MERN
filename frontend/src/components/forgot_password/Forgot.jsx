import { useEffect, useState } from "react";
import useAxiosPost from "../../api/useAxiosPost";
import useToast from "../../hooks/useToast";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import BackToSignIn from "./BackToSignIn";
import { useNavigate } from "react-router";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setURL, setRequest, status, response, cleanUp, resErrMsg } =
    useAxiosPost();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 200) {
      showToast(response?.message, "success");
      cleanUp();
      setLoading(false);
      navigate("/", { replace: true });
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
    <div className="col align-items-center flex-col forgot-pass">
      <Stack
        className="form-wrapper align-items-center"
        spacing={2}
        direction="column"
      >
        <Box
          className="form forgot-pass"
          component="form"
          sx={{ "& .MuiTextField-root": { m: 2, width: "90%" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
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
            sx={{ padding: 1.5, background: "var(--primary-color)" }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
          <BackToSignIn />
        </Box>
      </Stack>
    </div>
  );
};

export default Forgot;
