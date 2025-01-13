/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./reset.css";
import SideContent from "../../components/forgot_password/SideContent";
import { useSearchParams } from "react-router";
import Reset from "../../components/forgot_password/Reset";
import Forgot from "../../components/forgot_password/forgot";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("resetToken");
  const [isResetPassForm, setIsResetPassForm] = useState(!!token);

  useEffect(() => {
    setIsResetPassForm(!!token);
  }, [token]);

  return (
    <div
      className={`container ${isResetPassForm ? "reset-pass" : "forgot-pass"}`}
      id="container"
    >
      {/* FORM SECTION */}
      <div className="row">
        <Reset token={token} />
        <Forgot />
      </div>
      <SideContent />
    </div>
  );
};

export default ResetPasswordPage;
