import React from "react";
import { useNavigate } from "react-router-dom";
import { produtos as produtosOriginais } from "../produtos/produtos";
import "./ProdutoForm.css";

export default function ListarProdutos() {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>Lista de Produtos</h2>
      <ul className="lista-produtos">
        {produtosOriginais.map((produto) => (
          <li key={produto.id}>
            <img src={produto.imagem} alt={produto.nome} />
            <div>
              <strong>{produto.nome}</strong>
              <br />
              R$ {produto.valor.toFixed(2)}
            </div>
            <div className="botoes-acoes">
              <button onClick={() => navigate(`/editar-produto/${produto.id}`)}>
                Editar
              </button>
              <button onClick={() => navigate(`/remover-produto/${produto.id}`)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}