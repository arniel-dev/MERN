import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosPost from "../../api/useAxiosPost";
import useToast from "../../hooks/useToast";

import { useNavigate } from "react-router";

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
      <div className="form-wrapper align-items-center">
        {/* <div className="form sign-in"> */}
        <form className="form sign-in" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <i className="bx bx-mail-send"></i>
            <input type="text" placeholder="Email" {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <button type="submit">Sign in</button>
          <p>
            <b>Forgot password?</b>
          </p>
          <p>
            <span>Don't have an account?</span>
            <b onClick={toggle} className="pointer">
              Sign up here
            </b>
          </p>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  toggle: PropTypes.func,
};

export default SignIn;
