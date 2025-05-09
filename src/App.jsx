import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProdutosPage from "./pages/produtos/Produtos.jsx";
import Login from "./pages/login/Login.jsx";
import CriarLogin from "./pages/criarLogin/CriarLogin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-login" element={<CriarLogin />} />
        <Route path="/produtos" element={<ProdutosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
