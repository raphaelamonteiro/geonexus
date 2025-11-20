import express from 'express';

const app = express();
const PORT = 3001;

app.get('/api/health', (req, res) => {
    res.json({ message: 'Servidor mínimo funcionando! 🚀' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor mínimo rodando na porta ${PORT}`);
    console.log(`📊 Teste: http://localhost:${PORT}/api/health`);
});