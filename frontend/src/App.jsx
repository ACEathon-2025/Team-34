import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import AuthorityDashboard from "../pages/AuthorityDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/authority" element={<AuthorityDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
