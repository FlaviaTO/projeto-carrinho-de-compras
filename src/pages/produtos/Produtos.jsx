import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../componentes/carrinho/carrinhoContext";
import { useProdutos } from "../../pages/produtos/ProdutoContext";
import "./Produtos.css";
import Carrinho from "../../componentes/carrinho";

export default function Produtos() {
  const { carrinhoAberto, adicionarAoCarrinho } = useCarrinho();
  const { produtos, loading } = useProdutos();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    document.title = "Tela de Produtos";
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <>
    <button className="botao-logout" onClick={handleLogout}> 
      Sair
    </button>
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
