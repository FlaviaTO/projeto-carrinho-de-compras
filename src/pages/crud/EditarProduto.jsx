import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { produtos } from "../produtos/produtos";
import "./ProdutoForm.css";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const produtoSelecionado = produtos.find((p) => p.id === parseInt(id));
    setProduto(produtoSelecionado);
  }, [id]);

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produto editado:", produto);
    alert("Produto editado com sucesso!");
    navigate("/listar-produtos");
  };

  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className="form-container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          placeholder="Nome do Produto"
        />
        <input
          type="number"
          name="valor"
          value={produto.valor}
          onChange={handleChange}
          placeholder="Valor"
        />
        <input
          type="text"
          name="imagem"
          value={produto.imagem}
          onChange={handleChange}
          placeholder="URL da Imagem"
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}