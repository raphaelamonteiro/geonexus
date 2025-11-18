import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // Permite o front acessar o back

// Rota simples
app.get("/hello", (req, res) => {
    res.json({ message: "Olá, Rafa! Backend funcionando!" });
});

app.listen(3000, () => {
    console.log("🔥 Backend rodando em http://localhost:3000");
});
