import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosPost from "../../api/useAxiosPost";
import useToast from "../../hooks/useToast";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Cancel from "./BackToSignIn";
import Typography from "@mui/material/Typography";

const formSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Reset = ({ token }) => {
  const { setURL, setRequest, status, response, cleanUp, resErrMsg } =
    useAxiosPost();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    setURL(`api/users/reset-password/${token}`);
    setRequest(data);
  };

  useEffect(() => {
    if (status === 200) {
      showToast(response?.message, "success");
      cleanUp().then(() => {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      });
    }
    if (resErrMsg) {
      showToast(resErrMsg?.response?.data?.message, "error");
      cleanUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, resErrMsg]);

  return (
    <div className="col align-items-center flex-col reset-pass">
      <Stack
        className="form-wrapper align-items-center"
        spacing={2}
        direction="column"
      >
        <Box
          className="form reset-pass"
          component="form"
          sx={{ "& .MuiTextField-root": { m: 2, width: "90%" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="password"
            label="Password"
            type="password"
            {...register("password")}
            variant="outlined"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />
          <Button sx={{ mt: 2 }} type="submit" variant="contained">
            Reset
          </Button>
          <Cancel />
        </Box>
      </Stack>
    </div>
  );
};

Reset.propTypes = {
  token: PropTypes.string,
};

export default Reset;
