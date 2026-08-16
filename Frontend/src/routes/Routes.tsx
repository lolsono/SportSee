import { Routes, Route } from "react-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";

export default function AppRoutes() {
    
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}