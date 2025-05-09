import React, { useState, useEffect } from "react";
import { produtos } from "./produtos";
import { useCarrinho } from "../../componentes/carrinho/carrinhoContext";
import "./Produtos.css";
import Carrinho from "../../componentes/carrinho";

export default function Produtos() {
  const { carrinhoAberto, adicionarAoCarrinho } = useCarrinho();
 
  useEffect(() => {
    document.title = "Tela de Produtos";
  }, []);

  return (
    <>
      <div
        className={`grid-produtos ${carrinhoAberto ? "carrinho-aberto" : ""}`}
      >
        {produtos.map((produto) => (
          <div key={produto.id} className="produto">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p>
              {produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      <Carrinho />
    </>
  );
}
