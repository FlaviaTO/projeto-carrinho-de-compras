import React, { createContext, useContext, useEffect, useState } from "react";
import {
  listarProdutos,
  criarProduto,
  editarProduto,
  removerProduto,
} from "../api/api";

const ProdutoContext = createContext();

export function ProdutoProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    setLoading(true);
    try {
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch (e) {
      console.error(e);
      if (
        e.message.includes("401") ||
        e.message.includes("403") ||
        e.message === "Não autorizado"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }

  async function adicionarProduto(produto) {
    await criarProduto(produto);
    await carregarProdutos();
  }

  async function atualizarProduto(id, produto) {
    await editarProduto(id, produto);
    await carregarProdutos();
  }

  async function excluirProduto(id) {
    await removerProduto(id);
    await carregarProdutos();
  }

  return (
    <ProdutoContext.Provider
      value={{
        produtos,
        loading,
        adicionarProduto,
        atualizarProduto,
        excluirProduto,
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
}

export function useProdutos() {
  return useContext(ProdutoContext);
}
