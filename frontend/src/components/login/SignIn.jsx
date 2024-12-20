import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosPost from "../../api/useAxiosPost";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = ({ toggle }) => {
  const { setURL, setRequest, status, response, cleanUp, resErrMsg } =
    useAxiosPost();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    setURL("api/users/signin");
    setRequest(data);
  };

  useEffect(() => {
    if (status === 200) {
      showToast(response?.message, "success");
      login(response?.token);
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
    <div className="col align-items-center flex-col sign-in">
      <Stack
        className="form-wrapper align-items-center"
        spacing={2}
        direction="column"
      >
        <Box
          className="form sign-in"
          component="form"
          sx={{ "& .MuiTextField-root": { m: 2, width: "90%" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="email"
            label="Email"
            {...register("email")}
            variant="outlined"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            {...register("password")}
            variant="outlined"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          <Button sx={{ mt: 2 }} type="submit" variant="contained">
            Sign in
          </Button>
          <Box component="div" sx={{ m: 2 }}>
            <Link
              component="b"
              variant="body2"
              onClick={toggle}
              underline="hover"
              aria-label=""
              sx={{ cursor: "pointer" }}
            >
              Forgot password?
            </Link>

            <div>
              <span>Don't have an account?</span>
              <Link
                component="span"
                variant="body2"
                onClick={toggle}
                underline="hover"
                aria-label=""
                sx={{ cursor: "pointer" }}
              >
                Sign up here
              </Link>
            </div>
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

SignIn.propTypes = {
  toggle: PropTypes.func,
};

export default SignIn;
