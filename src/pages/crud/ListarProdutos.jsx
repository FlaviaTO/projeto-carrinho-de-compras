import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProdutoForm.css";
import { listarProdutos } from "../api/api";

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const lista = await listarProdutos();
        setProdutos(lista);
      } catch (e) {
        console.error("Erro ao buscar produtos: ", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="form-container">
      <h2>Lista de Produtos</h2>
      <ul className="lista-produtos">
        {produtos.map((produto) => (
          <li key={produto.id}>
            <img src={produto.imagem} alt={produto.nome} />
            <div>
              <strong>{produto.nome}</strong>
              <br />
              R$ {parseFloat(produto.valor).toFixed(2)}
            </div>
            <div className="botoes-acoes">
              <button onClick={() => navigate(`/editar-produto/${produto.id}`)}>
                Editar
              </button>
              <button
                onClick={() => navigate(`/remover-produto/${produto.id}`)}
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
