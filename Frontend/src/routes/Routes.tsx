import { Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";

import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";
import Dashboard from "../pages/Dashboard";
import Loading from "../pages/Loading";
import { useAuth } from "../context/ContextAuth";

function ProtectedRoute({ children }) {

    const { userDetails, loading } = useAuth();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!userDetails) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loading" element={<Loading />} />

      <Route
        path="/homePage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
