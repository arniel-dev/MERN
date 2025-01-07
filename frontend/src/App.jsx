import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "../src/pages/home/HomePage";
import LoginPage from "../src/pages/login_page/LoginPage";
import PrivateRoutes from "./components/private_routes/PrivateRoutes";
import ForgotPassword from "./components/forgot_password/forgotpassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" exact element={<HomePage />} />
        </Route>
        <Route path="*" element={<div>Unauthorized Page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
