// backend/src/services/restcountries.service.ts
import axios from 'axios';

const RESTCOUNTRIES_API = 'https://restcountries.com/v3.1';

export interface RestCountry {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
    cca3: string;
    region: string;
    subregion: string;
    capital?: string[];
    population: number;
    area: number;
    flags: {
        png: string;
        svg: string;
    };
    independent?: boolean;
}

export const restcountriesService = {
    // ✅ USANDO O ENDPOINT CORRETO: independent?status=true
    async getAllCountries(): Promise<RestCountry[]> {
        try {
            console.log('🌍 Buscando países da RestCountries API...');

            // ENDPOINT CORRETO que você encontrou
            const response = await axios.get(`${RESTCOUNTRIES_API}/independent?status=true`, {
                timeout: 15000,
            });

            console.log(`✅ Encontrados ${response.data.length} países`);
            return response.data;

        } catch (error: any) {
            console.error('❌ Erro ao buscar países:', error.message);
            throw new Error('Falha ao buscar dados dos países');
        }
    },

    // Buscar país por nome
    async getCountryByName(name: string): Promise<RestCountry[]> {
        try {
            const response = await axios.get(`${RESTCOUNTRIES_API}/name/${name}`, {
                timeout: 5000,
            });
            return response.data;
        } catch (error: any) {
            console.error(`Erro ao buscar país ${name}:`, error.message);
            throw new Error(`País "${name}" não encontrado`);
        }
    },

    // Buscar países por região
    async getCountriesByRegion(region: string): Promise<RestCountry[]> {
        try {
            const response = await axios.get(`${RESTCOUNTRIES_API}/region/${region}`, {
                timeout: 5000,
            });
            return response.data;
        } catch (error: any) {
            console.error(`Erro ao buscar países da região ${region}:`, error.message);
            throw new Error(`Região "${region}" não encontrada`);
        }
    },

    // Buscar país por código
    async getCountryByCode(code: string): Promise<RestCountry[]> {
        try {
            const response = await axios.get(`${RESTCOUNTRIES_API}/alpha/${code}`, {
                timeout: 5000,
            });
            return response.data;
        } catch (error: any) {
            console.error(`Erro ao buscar país com código ${code}:`, error.message);
            throw new Error(`País com código "${code}" não encontrado`);
        }
    }
};