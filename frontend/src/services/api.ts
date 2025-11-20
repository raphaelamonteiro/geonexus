import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Interfaces para TypeScript
export interface Continent {
    id: number;
    name: string;
    createdAt: string;
    countries?: Country[];
}

export interface Country {
    id: number;
    name: string;
    code: string;
    continentId: number;
    continent?: Continent;
    cities?: City[];
}

export interface City {
    id: number;
    name: string;
    countryId: number;
    country?: Country;
}

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

export interface ApiCountry {
    name: string;
    officialName: string;
    code: string;
    code3: string;
    region: string;
    capital: string;
    population: number;
    area: number;
    flag: string;
}

// Serviços da API
export const apiService = {
    // Continentes
    continents: {
        getAll: () => api.get<Continent[]>('/continents'),
        getById: (id: number) => api.get<Continent>(`/continents/${id}`),
        create: (data: { name: string }) => api.post<Continent>('/continents', data),
        update: (id: number, data: { name: string }) => api.put<Continent>(`/continents/${id}`, data),
        delete: (id: number) => api.delete(`/continents/${id}`),
    },

    // Países
    countries: {
        getAll: () => api.get<Country[]>('/countries'),
        getById: (id: number) => api.get<Country>(`/countries/${id}`),
        create: (data: { name: string; code: string; continentId: number }) =>
            api.post<Country>('/countries', data),
        update: (id: number, data: { name?: string; code?: string; continentId?: number }) =>
            api.put<Country>(`/countries/${id}`, data),
        delete: (id: number) => api.delete(`/countries/${id}`),
    },

    // Cidades
    cities: {
        getAll: () => api.get<City[]>('/cities'),
        getById: (id: number) => api.get<City>(`/cities/${id}`),
        create: (data: { name: string; countryId: number }) =>
            api.post<City>('/cities', data),
        update: (id: number, data: { name?: string; countryId?: number }) =>
            api.put<City>(`/cities/${id}`, data),
        delete: (id: number) => api.delete(`/cities/${id}`),
    },

    // API Externa - RestCountries
    external: {
        getCountries: (params?: { name?: string; region?: string; code?: string }) =>
            api.get<{ count: number; countries: ApiCountry[] }>('/external/countries', { params }),
        getRegions: () => api.get<{ regions: string[] }>('/external/regions'),
        importCountry: (data: { code: string; continentId: number }) =>
            api.post('/external/countries/import', data),
    },

    // Notícias
    news: {
        getGeneral: () => api.get('/news'),
        getByCountry: (countryCode: string, category?: string) =>
            api.get(`/news/country/${countryCode}`, { params: { category } }),
        getByCategory: (category: string) =>
            api.get(`/news/category/${category}`),
    },

    // Health Check
    health: () => api.get('/health'),
};

export default api;