import React, { useState } from "react";
import "./ProdutoForm.css";

export default function CriarProduto() {
  const [produto, setProduto] = useState({
    nome: "",
    valor: "",
    imagem: "",
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produto criado:", produto);
    alert("Produto criado com sucesso!");
  };

  return (
    <div className="form-container">
      <h2>Criar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={produto.nome}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor (ex: 999.99)"
          value={produto.valor}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagem"
          placeholder="URL da imagem"
          value={produto.imagem}
          onChange={handleChange}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
