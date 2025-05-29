import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function criarProduto(req, res) {
  const { nome, valor, imagem } = req.body;

  try {
    const novo = await prisma.produto.create({
      data: { nome, valor, imagem },
    });
    return res.status(201).json(novo);
  } catch (e) {
    console.error("Erro ao criar produto:", e.message);
    return res.status(500).json({ erro: "Não foi possível criar o produto" });
  }
}

export async function lerProdutos(req, res) {
  try {
    const lista = await prisma.produto.findMany();
    return res.status(200).json(lista);
  } catch (e) {
    console.error("Erro ao ler produtos:", e.message);
    return res
      .status(500)
      .json({ erro: "Não foi possível listar os produtos" });
  }
}

export async function deletarProduto(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ erro: "ID do produto é obrigatório" });
  }

  try {
    const apagado = await prisma.produto.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({ mensagem: "Produto removido", apagado });
  } catch (e) {
    console.error("Erro ao deletar produto:", e.message);
    return res.status(500).json({ erro: "Não foi possível deletar o produto" });
  }
}

export async function atualizarProduto(req, res) {
  const { id } = req.params;
  const { nome, valor, imagem } = req.body;

  if (!id) {
    return res.status(400).json({ erro: "ID do produto é obrigatório" });
  }

  try {
    const atualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: { nome, valor, imagem },
    });
    return res.status(200).json(atualizado);
  } catch (e) {
    console.error("Erro ao atualizar produto:", e.message);
    return res
      .status(500)
      .json({ erro: "Não foi possível atualizar o produto" });
  }
}
