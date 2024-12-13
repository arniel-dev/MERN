import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosPost from "../../api/useAxiosPost";
import useToast from "../../hooks/useToast";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const formSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
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
      <div className="form-wrapper align-items-center">
        <form className="form sign-up" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <i className="bx bxs-user"></i>
            <input
              type="text"
              placeholder="First name"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="error">{errors.firstname.message}</p>
            )}
          </div>
          <div className="input-group">
            <i className="bx bxs-user"></i>
            <input
              type="text"
              placeholder="Last name"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="error">{errors.lastname.message}</p>
            )}
          </div>
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
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button type="submit"> Sign up</button>
          <p>
            <span>Already have an account?</span>
            <b onClick={toggle} className="pointer">
              Sign in here
            </b>
          </p>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  toggle: PropTypes.func,
};

export default SignUp;
