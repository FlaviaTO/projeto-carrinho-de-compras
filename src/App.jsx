import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./componentes/routers/Routes";
import { ProdutoProvider } from "./pages/produtos/ProdutoContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <ProdutoProvider>
        <AppRoutes />
      </ProdutoProvider>
    </BrowserRouter>
  );
}

export default App;
