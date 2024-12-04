import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login_page/LoginPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
