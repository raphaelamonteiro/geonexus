import dotenv from 'dotenv';

// Carregar env primeiro
dotenv.config();

console.log('🔍 DEBUG - Variáveis de ambiente:');
console.log('NEWS_API_KEY:', process.env.NEWS_API_KEY ? '✅ EXISTE' : '❌ NÃO EXISTE');
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ EXISTE' : '❌ NÃO EXISTE');

// Testar requisição manual
import axios from 'axios';

async function testManualRequest() {
    const apiKey = process.env.NEWS_API_KEY;
    console.log('\n🧪 Teste manual da API:');
    console.log('API Key:', apiKey);

    if (!apiKey) {
        console.log('❌ API Key não encontrada no .env');
        return;
    }

    try {
        console.log('🌐 Fazendo requisição manual...');
        const response = await axios.get('https://newsdata.io/api/1/news', {
            params: {
                apikey: apiKey,
                country: 'br',
                language: 'pt',
                size: 3
            },
            timeout: 10000
        });

        console.log('✅ Resposta recebida!');
        console.log('Status:', response.status);
        console.log('Total de resultados:', response.data.totalResults);
        console.log('Primeira notícia:', response.data.results[0]?.title);

    } catch (error: any) {
        console.error('❌ Erro na requisição manual:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Erro:', error.message);
        }
    }
}

testManualRequest();