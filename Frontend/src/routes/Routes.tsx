import { Routes, Route, Navigate } from "react-router";

import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/homePage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
