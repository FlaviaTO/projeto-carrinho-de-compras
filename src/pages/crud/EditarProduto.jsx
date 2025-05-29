import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editarProduto, listarProdutos } from "../api/api";
import "./ProdutoForm.css";

export default function EditarProduto() {
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

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editarProduto(produto.id, {
        ...produto,
        valor: parseFloat(produto.valor),
      });
      console.log("Produto editado:", produto);
      alert("Produto editado com sucesso!");
      navigate("/listar-produtos");
    } catch (err) {
      alert("Erro ao editar produto!");
      console.error(err);
    }
  };

  if (!produto) return <p>Carregando produto...</p>;

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
