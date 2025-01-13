import Typography from "@mui/material/Typography";

const SideContent = () => {
  return (
    <>
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* FORGOT PASSWORD CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text forgot-pass">
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Forgot Password
            </Typography>
          </div>
        </div>

        {/* RESET PASSWORD CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text reset-pass">
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Reset Your Password
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideContent;
