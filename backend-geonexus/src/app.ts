import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Carrega variáveis de ambiente (.env)
dotenv.config();

import userRoutes from "./modules/users/user.routes";

const app = express();

// Permite que o frontend acesse o backend
app.use(cors());

// Permite receber JSON no corpo da requisição
app.use(express.json());

// Todas as rotas de /api/users vão para userRoutes
app.use("/api/users", userRoutes);

export default app;
