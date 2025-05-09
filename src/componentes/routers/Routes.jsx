import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import CriarLogin from "../pages/CriarLogin";
import Produtos from "../pages/Produtos";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/criar-login" element={<CriarLogin />} />
    </Routes>
  );
}

export default AppRoutes;
