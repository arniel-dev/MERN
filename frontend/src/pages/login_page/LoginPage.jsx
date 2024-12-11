import { useState, useEffect } from "react";
import "./login.css";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import SideContent from "../../components/sideContent";

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggle = () => {
    setIsSignIn((prev) => !prev);
  };

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
