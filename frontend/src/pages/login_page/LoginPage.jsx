/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./login.css";
import SignUp from "../../components/login/SignUp";
import SignIn from "../../components/login/SignIn";
import SideContent from "../../components/login/SideContent";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  const navigate = useNavigate();
  const toggle = () => {
    setIsSignIn((prev) => !prev);
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated]);

  // Ensure the container starts with sign-in state on mount
  useEffect(() => {
    setIsSignIn(true);
  }, []);

  return (
    <div
      className={`container ${isSignIn ? "sign-in" : "sign-up"}`}
      id="container"
    >
      {/* FORM SECTION */}
      <div className="row">
        <SignUp toggle={toggle} />
        <SignIn toggle={toggle} />
      </div>
      <SideContent />
    </div>
  );
};

export default LoginPage;
