import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secreta-temporaria";

export async function registrar(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ erro: "Nome, email e senha são obrigatórios" });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash },
    });

    return res.status(201).json({ mensagem: "Usuário registrado", usuario });
  } catch (err) {
    console.error("Erro no registro:", err.message);
    return res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha inválida" });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({
        mensagem: "Login realizado com sucesso",
        token,
        nome: usuario.nome,
      });
  } catch (err) {
    console.error("Erro no login:", err.message);
    return res.status(500).json({ erro: "Erro ao fazer login" });
  }
}
