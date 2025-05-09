import React, { createContext, useState, useContext } from "react";

export const CarrinhoContext = createContext();

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState([]);

  const abrirCarrinho = () => setCarrinhoAberto(true);
  const fecharCarrinho = () => setCarrinhoAberto(false);

  const adicionarAoCarrinho = (produto) => {
    setItensCarrinho((prevItens) => {
      const itemExistente = prevItens.find((item) => item.id === produto.id);

      if (itemExistente) {
        return prevItens.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevItens, { ...produto, quantidade: 1 }];
      }
    });

    abrirCarrinho();
  };

  const removerDoCarrinho = (id) => {
    setItensCarrinho((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  const alterarQuantidade = (id, tipo) => {
    setItensCarrinho((prevItens) =>
      prevItens
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade:
                  tipo === "aumentar"
                    ? item.quantidade + 1
                    : item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinhoAberto,
        abrirCarrinho,
        fecharCarrinho,
        itensCarrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
