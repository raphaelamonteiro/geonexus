export async function fetchCountries() {
    try {
        const response = await fetch("http://localhost:3000/api/countries");

        if (!response.ok) {
            throw new Error(`Erro ao buscar países: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Erro no fetchCountries:", error);
        return [];
    }
}
