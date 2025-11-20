// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRoutes from './routes/news.routes';


// Routes
import continentRoutes from './routes/continent.routes';
import countryRoutes from './routes/country.routes';
import cityRoutes from './routes/city.routes';
import externalRoutes from './routes/external.routes';

console.log('1. Carregando variáveis de ambiente...');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log('2. Configurando middlewares...');
// Middlewares
app.use(cors());
app.use(express.json());

console.log('3. Configurando rotas...');
// Health Check
app.get('/api/health', (req, res) => {
    console.log('✅ Health check acionado');
    res.json({
        message: 'Backend funcionando! 🚀',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/continents', continentRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/external', externalRoutes);


app.get('/api', (req, res) => {
    res.json({
        message: '🌍 GeoNexus API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /api/health',
            continents: 'GET,POST /api/continents',
            countries: 'GET,POST /api/countries',
            cities: 'GET,POST /api/cities',
            external: {
                countries: 'GET /api/external/countries',
                import: 'POST /api/external/countries/import',
                regions: 'GET /api/external/regions'
            },
            news: {
                general: 'GET /api/news',
                byCountry: 'GET /api/news/country/:code',
                byCategory: 'GET /api/news/category/:category'
            }
        }
    });
});

console.log('4. Iniciando servidor...');
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 API docs: http://localhost:${PORT}/api`);
});

console.log('5. Servidor configurado!');

app.use('/api/news', newsRoutes);