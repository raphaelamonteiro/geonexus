import { Request, Response } from "express";
import { getNewsByCountry } from "../external/newsData.service";
import {
    fetchRestCountries
} from "../external/restCountries.service";

export const ExternalController = {
    async getAllCountries(req: Request, res: Response) {
        try {
            const data = await fetchRestCountries();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar países" });
        }
    },

    async getCountryNews(req: Request, res: Response) {
        const { country } = req.params;

        try {
            const news = await getNewsByCountry(country);
            res.json(news);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar notícias" });
        }
    }
};
