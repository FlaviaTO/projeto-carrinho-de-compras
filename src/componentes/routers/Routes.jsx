import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../pages/login/Login";
import CriarLogin from "../../pages/criarLogin/CriarLogin";
import Produtos from "../../pages/produtos/Produtos.jsx";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const NotFound = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>404 - Página não encontrada</h2>
      <p>A rota digitada não existe.</p>
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/criar-login" element={<CriarLogin />} />

      <Route
        path="/produtos"
        element={
          <ProtectedRoute>
            <Produtos />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
