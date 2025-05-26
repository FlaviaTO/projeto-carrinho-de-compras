import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { produtos } from "../produtos/produtos";
import "./ProdutoForm.css";

export default function RemoverProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const produtoSelecionado = produtos.find((p) => p.id === parseInt(id));
    setProduto(produtoSelecionado);
  }, [id]);

  const handleRemover = () => {
    console.log("Produto removido:", produto);
    alert("Produto removido com sucesso!");
    navigate("/listar-produtos");
  };

  if (!produto) return <p>Produto não encontrado.</p>;

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
