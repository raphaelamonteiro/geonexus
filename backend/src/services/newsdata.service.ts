import axios from 'axios';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const NEWSDATA_API = 'https://newsdata.io/api/1/news';
const API_KEY = process.env.NEWS_API_KEY; // Agora deve carregar corretamente

console.log('🔑 NewsData API Key:', API_KEY ? '✅ Configurada' : '❌ Não configurada');

export interface NewsArticle {
    title: string;
    description: string;
    link: string;
    image_url?: string;
    pubDate: string;
    source_id: string;
    country: string[];
    category: string[];
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    results: NewsArticle[];
    nextPage?: string;
}

export const newsdataService = {
    // Buscar notícias por país
    async getNewsByCountry(countryCode: string, category?: string): Promise<NewsResponse> {
        try {
            if (!API_KEY) {
                console.error('❌ API Key não encontrada. Verifique o .env');
                throw new Error('Chave da API NewsData não configurada');
            }

            console.log(`📰 Buscando notícias para país: ${countryCode}`);

            const params: any = {
                apikey: API_KEY,
                country: countryCode.toLowerCase(),
                language: 'pt,en',
                size: 10
            };

            if (category) {
                params.category = category;
            }

            console.log('🌐 Fazendo requisição para NewsData...');
            const response = await axios.get(NEWSDATA_API, {
                params,
                timeout: 15000,
            });

            console.log(`✅ Notícias encontradas: ${response.data.totalResults}`);
            return response.data;

        } catch (error: any) {
            console.error('❌ Erro detalhado ao buscar notícias:');

            if (error.response) {
                // A API respondeu com erro
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
                console.error('Mensagem:', error.response.data?.message);

                if (error.response.status === 402) {
                    throw new Error('Limite de requisições excedido ou créditos insuficientes');
                } else if (error.response.status === 401) {
                    throw new Error('API Key inválida ou não autorizada');
                } else if (error.response.status === 429) {
                    throw new Error('Muitas requisições - tente novamente mais tarde');
                }
            } else if (error.request) {
                // Não houve resposta
                console.error('Sem resposta do servidor - verifique conexão com internet');
                throw new Error('Não foi possível conectar com o servidor de notícias');
            } else {
                // Outro erro
                console.error('Erro:', error.message);
                throw new Error(`Erro na requisição: ${error.message}`);
            }

            throw new Error('Falha ao buscar notícias');
        }
    },

    // Buscar notícias por categoria
    async getNewsByCategory(category: string): Promise<NewsResponse> {
        try {
            if (!API_KEY) {
                throw new Error('Chave da API NewsData não configurada');
            }

            const response = await axios.get(NEWSDATA_API, {
                params: {
                    apikey: API_KEY,
                    category: category,
                    language: 'pt,en',
                    size: 10
                },
                timeout: 10000,
            });

            return response.data;

        } catch (error: any) {
            console.error('Erro ao buscar notícias por categoria:', error.message);
            throw new Error(`Falha ao buscar notícias de ${category}`);
        }
    },

    // Buscar notícias gerais
    async getGeneralNews(): Promise<NewsResponse> {
        try {
            if (!API_KEY) {
                throw new Error('Chave da API NewsData não configurada');
            }

            const response = await axios.get(NEWSDATA_API, {
                params: {
                    apikey: API_KEY,
                    language: 'pt,en',
                    size: 10
                },
                timeout: 10000,
            });

            return response.data;

        } catch (error: any) {
            console.error('Erro ao buscar notícias gerais:', error.message);
            throw new Error('Falha ao buscar notícias gerais');
        }
    }
};