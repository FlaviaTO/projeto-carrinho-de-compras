import { Router } from "express";
import {
  criarProduto,
  lerProdutos,
  deletarProduto,
  atualizarProduto,
} from "./controllers/produtos.js";

import { autenticarToken } from "./middleware/authMiddleware.js";

const router = Router();

router.use(autenticarToken);

router.post("/produtos", criarProduto);
router.get("/produtos", lerProdutos);
router.put("/produtos/:id", atualizarProduto);
router.delete("/produtos/:id", deletarProduto);

export default router;