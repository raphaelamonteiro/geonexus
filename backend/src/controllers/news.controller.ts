import { Request, Response } from 'express';
import { newsdataService, NewsResponse } from '../services/newsdata.service';

export const newsController = {
    // GET /api/news/country/:countryCode - Notícias por país
    async getNewsByCountry(req: Request, res: Response) {
        try {
            const { countryCode } = req.params;
            const { category } = req.query;

            if (!countryCode) {
                return res.status(400).json({ error: 'Código do país é obrigatório' });
            }

            const news: NewsResponse = await newsdataService.getNewsByCountry(
                countryCode as string,
                category as string
            );

            res.json({
                country: countryCode.toUpperCase(),
                category: category || 'all',
                totalResults: news.totalResults,
                articles: news.results.slice(0, 6) // Limitar para 6 artigos
            });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/news/category/:category - Notícias por categoria
    async getNewsByCategory(req: Request, res: Response) {
        try {
            const { category } = req.params;

            if (!category) {
                return res.status(400).json({ error: 'Categoria é obrigatória' });
            }

            const news: NewsResponse = await newsdataService.getNewsByCategory(category);

            res.json({
                category: category,
                totalResults: news.totalResults,
                articles: news.results.slice(0, 6)
            });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/news - Notícias gerais
    async getGeneralNews(req: Request, res: Response) {
        try {
            const news: NewsResponse = await newsdataService.getGeneralNews();

            res.json({
                category: 'general',
                totalResults: news.totalResults,
                articles: news.results.slice(0, 6)
            });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};