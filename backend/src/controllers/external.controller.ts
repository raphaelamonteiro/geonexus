import { Request, Response } from 'express';
import { restcountriesService, RestCountry } from '../services/restcountries.service';
import { prisma } from '../services/prisma.service';

export const externalController = {
    // GET /api/external/countries - Buscar países da API externa
    async getCountriesFromAPI(req: Request, res: Response) {
        try {
            const { name, region, code } = req.query;

            let countries: RestCountry[];

            if (name) {
                countries = await restcountriesService.getCountryByName(name as string);
            } else if (region) {
                countries = await restcountriesService.getCountriesByRegion(region as string);
            } else if (code) {
                countries = await restcountriesService.getCountryByCode(code as string);
            } else {
                countries = await restcountriesService.getAllCountries();
            }

            // Formatar resposta
            const formattedCountries = countries.map(country => ({
                name: country.name.common,
                officialName: country.name.official,
                code: country.cca2,
                code3: country.cca3,
                region: country.region,
                subregion: country.subregion,
                capital: country.capital?.[0] || 'N/A',
                population: country.population,
                area: country.area,
                flag: country.flags.png
            }));

            res.json({
                count: formattedCountries.length,
                countries: formattedCountries
            });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST /api/external/countries/import - Importar país para o banco
    async importCountry(req: Request, res: Response) {
        try {
            const { code, continentId } = req.body;

            if (!code || !continentId) {
                return res.status(400).json({
                    error: 'Código do país e continentId são obrigatórios'
                });
            }

            // Buscar país da API
            const [apiCountry] = await restcountriesService.getCountryByCode(code);

            // Verificar se o país já existe no banco
            const existingCountry = await prisma.country.findUnique({
                where: { code: apiCountry.cca2 }
            });

            if (existingCountry) {
                return res.status(400).json({ error: 'País já existe no banco' });
            }

            // Criar país no banco
            const country = await prisma.country.create({
                data: {
                    name: apiCountry.name.common,
                    code: apiCountry.cca2,
                    continentId: parseInt(continentId)
                },
                include: {
                    continent: true
                }
            });

            // Se tiver capital, criar cidade também
            if (apiCountry.capital?.[0]) {
                await prisma.city.create({
                    data: {
                        name: apiCountry.capital[0],
                        countryId: country.id
                    }
                });
            }

            res.status(201).json({
                message: 'País importado com sucesso!',
                country: country,
                capital: apiCountry.capital?.[0] || null
            });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/external/regions - Listar regiões disponíveis
    async getRegions(req: Request, res: Response) {
        try {
            const countries = await restcountriesService.getAllCountries();

            // Extrair regiões únicas
            const regions = [...new Set(countries.map(country => country.region))].filter(Boolean);

            res.json({
                regions: regions.sort()
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};