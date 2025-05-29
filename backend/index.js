import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import produtosRouter from "./routes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api", produtosRouter);

app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err.message);
  res.status(500).json({ erro: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
