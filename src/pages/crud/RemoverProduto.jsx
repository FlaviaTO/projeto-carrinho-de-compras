import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProdutoForm.css";
import { listarProdutos, removerProduto } from "../api/api";

export default function RemoverProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    async function carregarProdutos() {
      const produtos = await listarProdutos();
      const produtoSelecionado = produtos.find((p) => p.id === parseInt(id));
      setProduto(produtoSelecionado);
    }
    carregarProdutos();
  }, [id]);

  const handleRemover = async () => {
    try {
      await removerProduto(produto.id);
      console.log("Produto removido:", produto);
      alert("Produto removido com sucesso!");
      navigate("/listar-produtos");
    } catch (e) {
      alert("Erro ao remover produto!");
      console.error(e);
    }
  };

  if (!produto) return <p>Carregando produto...</p>;

  return (
    <div className="form-container">
      <h2>Remover Produto</h2>
      <p>
        <strong>ID:</strong> {produto.id}
      </p>
      <p>
        Tem certeza que deseja remover o produto <strong>{produto.nome}</strong>
        ?
      </p>
      <img
        src={produto.imagem}
        alt={produto.nome}
        style={{ maxWidth: "200px" }}
      />
      <div className="botoes-acoes">
        <button onClick={handleRemover}>Sim, remover</button>
        <button onClick={() => navigate("/listar-produtos")}>Cancelar</button>
      </div>
    </div>
  );
}
