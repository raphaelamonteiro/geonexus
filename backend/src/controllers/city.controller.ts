
import { Request, Response } from 'express';
import { prisma } from '../services/prisma.service';


export const cityController = {
    // GET /api/cities - Listar todas as cidades
    async getAll(req: Request, res: Response) {
        try {
            const cities = await prisma.city.findMany({
                include: {
                    country: {
                        include: {
                            continent: true
                        }
                    }
                }
            });
            res.json(cities);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cidades' });
        }
    },

    // GET /api/cities/:id - Buscar cidade por ID
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const city = await prisma.city.findUnique({
                where: { id: parseInt(id) },
                include: {
                    country: {
                        include: {
                            continent: true
                        }
                    }
                }
            });

            if (!city) {
                return res.status(404).json({ error: 'Cidade não encontrada' });
            }

            res.json(city);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cidade' });
        }
    },

    // POST /api/cities - Criar cidade
    async create(req: Request, res: Response) {
        try {
            const { name, countryId } = req.body;

            if (!name || !countryId) {
                return res.status(400).json({
                    error: 'Nome e countryId são obrigatórios'
                });
            }

            const city = await prisma.city.create({
                data: {
                    name,
                    countryId: parseInt(countryId)
                },
                include: {
                    country: {
                        include: {
                            continent: true
                        }
                    }
                }
            });

            res.status(201).json(city);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar cidade' });
        }
    },

    // PUT /api/cities/:id - Atualizar cidade
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, countryId } = req.body;

            const city = await prisma.city.update({
                where: { id: parseInt(id) },
                data: {
                    ...(name && { name }),
                    ...(countryId && { countryId: parseInt(countryId) })
                },
                include: {
                    country: {
                        include: {
                            continent: true
                        }
                    }
                }
            });

            res.json(city);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar cidade' });
        }
    },

    // DELETE /api/cities/:id - Deletar cidade
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.city.delete({
                where: { id: parseInt(id) }
            });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar cidade' });
        }
    }
};