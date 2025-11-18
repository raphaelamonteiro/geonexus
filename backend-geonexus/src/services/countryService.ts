import axios from "axios";

export async function getCountries() {
    const url = "https://restcountries.com/v3.1/independent?status=true";

    const response = await axios.get(url);

    return response.data.map((country: any) => ({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "No capital",
        region: country.region,
        population: country.population,
        flag: country.flags?.png,
    }));
}
