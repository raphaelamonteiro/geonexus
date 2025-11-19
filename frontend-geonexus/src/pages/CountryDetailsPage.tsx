import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNews } from "../services/newsService";
import { countryCodeMap } from "../utils/countryCodes";
import { Footer } from "../components/footer";

export default function CountryDetailsPage() {
    const { country } = useParams();
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const normalized = country!.toLowerCase().replaceAll(" ", "");

            const code = countryCodeMap[normalized];

            if (!code) {
                console.warn("❌ País sem código ISO:", normalized);
                setNews([]);
                return;
            }

            const data = await fetchNews(code);
            setNews(data.results || []);
        }
        load();
    }, [country]);

    return (
        <div>
            <h1>📰 Notícias sobre {country}</h1>

            {news.length === 0 ? (
                <p>Nenhuma notícia encontrada.</p>
            ) : (
                <ul>
                    {news.map((n, index) => (
                        <li key={index} style={{ marginBottom: "12px" }}>
                            <a href={n.link} target="_blank" rel="noopener noreferrer">
                                {n.title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            <Footer />
        </div>
    );
}
