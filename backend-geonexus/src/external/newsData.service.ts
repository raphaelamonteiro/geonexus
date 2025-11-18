import axios from "axios";
import "dotenv/config";

export async function getNewsByCountry(country: string) {
    const apiKey = process.env.NEWSDATA_API_KEY;

    if (!apiKey) {
        console.error("❌ API KEY do NewsData não encontrada no .env");
        return null;
    }

    const url = `https://newsdata.io/api/1/news?apikey=pub_ce6aa9e226484eae81fceb26a418e027&country=${country}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erro na NewsData:", error);
        throw error;
    }
}
