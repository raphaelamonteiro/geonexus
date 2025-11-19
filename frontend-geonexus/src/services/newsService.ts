export async function fetchNews(countryCode: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/news/${countryCode}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar notícias: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Erro no fetchNews:", error);
        return [];
    }
}
