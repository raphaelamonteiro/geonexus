import express from "express";
import cors from "cors";
import favoritesRoutes from "./routes/favoritesRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/favorites", favoritesRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000!"));
