// backend/src/test-newsdata.ts
import { newsdataService } from './services/newsdata.service';
import dotenv from 'dotenv';

dotenv.config();

async function testNewsDataAPI() {
    try {
        console.log('🧪 Testando NewsData API...\n');
        console.log('🔑 API Key:', process.env.NEWS_API_KEY ? '✅ Configurada' : '❌ Não encontrada');

        // Teste 1: Notícias gerais
        console.log('\n1. Testando notícias gerais...');
        const generalNews = await newsdataService.getGeneralNews();
        console.log(`✅ ${generalNews.totalResults} notícias gerais encontradas`);

        if (generalNews.results.length > 0) {
            console.log('📰 Exemplo:', generalNews.results[0].title);
        }

        // Teste 2: Notícias por país
        console.log('\n2. Testando notícias do Brasil...');
        const brNews = await newsdataService.getNewsByCountry('br');
        console.log(`✅ ${brNews.totalResults} notícias do Brasil encontradas`);

        if (brNews.results.length > 0) {
            console.log('📰 Exemplo:', brNews.results[0].title);
        }

        // Teste 3: Notícias por categoria
        console.log('\n3. Testando notícias de tecnologia...');
        const techNews = await newsdataService.getNewsByCategory('technology');
        console.log(`✅ ${techNews.totalResults} notícias de tecnologia encontradas`);

        if (techNews.results.length > 0) {
            console.log('📰 Exemplo:', techNews.results[0].title);
        }

        console.log('\n🎉 NewsData API funcionando perfeitamente!');

    } catch (error: any) {
        console.error('\n❌ Erro no teste da NewsData:', error.message);
    }
}

testNewsDataAPI();