import React, { useState } from "react";
import { useCarrinho } from "./carrinhoContext.jsx";
import "./style.css";
import img from "../../assets/Tag.svg";

export default function Carrinho() {
  const {
    carrinhoAberto,
    abrirCarrinho,
    fecharCarrinho,
    itensCarrinho,
    alterarQuantidade,
  } = useCarrinho();

  const [cupom, setCupom] = useState("");

  const calcularTotal = () =>
    itensCarrinho
      .reduce((acc, item) => acc + item.valor * item.quantidade, 0)
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <>
      {!carrinhoAberto && (
        <button className="botao-carrinho" onClick={abrirCarrinho}>
          🛒 Abrir Carrinho
        </button>
      )}

      <div
        className={`carrinho-compras ${carrinhoAberto ? "abrir" : "fechado"}`}
      >
        <h2>
          <div className="titulo-carrinho">
            Seu carrinho tem{" "}
            <span>
              {itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0)}{" "}
              {itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0) ===
              1
                ? "item"
                : "itens"}
            </span>
          </div>
          <span className="remove-item" onClick={fecharCarrinho}>
            ×
          </span>
        </h2>

        <div className="itens">
          {itensCarrinho.map((item) => (
            <div key={item.id} className="item">
              <img src={item.imagem} alt={item.nome} />
              <div className="info">
                <div className="nome-produto">{item.nome}</div>
                <div className="bottom-info">
                  <label className="preco">
                    {(item.valor * item.quantidade).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </label>
                  <div className="quantidade">
                    <button
                      className="remover"
                      onClick={() => alterarQuantidade(item.id, "diminuir")}
                    >
                      -
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      className="adicionar"
                      onClick={() => alterarQuantidade(item.id, "aumentar")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="resumo-compra">
          <p>
            Total: <span className="valor-total">{calcularTotal()}</span>
          </p>
          <div className="cupom-container">
            <img src={img} alt="Tag" />
            <input
              type="text"
              className="cupom-input"
              placeholder="Adicionar cupom"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
            />
            {cupom && (
              <span className="clear-cupom" onClick={() => setCupom("")}>
                ×
              </span>
            )}
          </div>
          <button className="finalizar">Finalizar compra</button>
        </div>
      </div>
    </>
  );
}
