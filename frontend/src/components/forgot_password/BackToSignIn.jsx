import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import Link from "@mui/material/Link";
function BackToSignIn() {
  const navigate = useNavigate();
  return (
    <Box component="div" sx={{ m: 2 }}>
      {"Back to "}
      <Link
        component="b"
        variant="body2"
        onClick={() => navigate("/login", { replace: true })}
        underline="hover"
        aria-label=""
        sx={{ cursor: "pointer" }}
      >
        Sign in
      </Link>
    </Box>
  );
}

export default BackToSignIn;
