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
import Link from "@mui/material/Link";

const formSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = ({ toggle }) => {
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
    setURL("api/users/signup");
    setRequest(data);
  };

  useEffect(() => {
    if (status === 201) {
      showToast(response?.message, "success");
      cleanUp().then(() => {
        setTimeout(() => {
          navigate(0);
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
    <div className="col align-items-center flex-col sign-up">
      <Stack
        className="form-wrapper align-items-center"
        spacing={2}
        direction="column"
      >
        {/* <form className="form sign-up" onSubmit={handleSubmit(onSubmit)}> */}
        <Box
          className="form sign-up"
          component="form"
          sx={{ "& .MuiTextField-root": { m: 2, width: "90%" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="fullname"
            label="Full name"
            {...register("fullname")}
            variant="outlined"
            error={!!errors.fullname}
            helperText={errors?.fullname?.message}
          />
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
            Sign up
          </Button>
          <Box component="div" sx={{ m: 2 }}>
            <div>
              <span>Already have an account?</span>
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

SignUp.propTypes = {
  toggle: PropTypes.func,
};

export default SignUp;
