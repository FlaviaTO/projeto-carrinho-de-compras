import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CarrinhoProvider } from "./componentes/carrinho/carrinhoContext";
import { ProdutoProvider } from "./pages/produtos/ProdutoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProdutoProvider>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </ProdutoProvider>
  </React.StrictMode>
);
