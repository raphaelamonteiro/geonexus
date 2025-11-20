// backend/src/controllers/country.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../services/prisma.service';


export const countryController = {
    // GET /api/countries - Listar todos os países
    async getAll(req: Request, res: Response) {
        try {
            const countries = await prisma.country.findMany({
                include: {
                    continent: true,
                    cities: true
                }
            });
            res.json(countries);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar países' });
        }
    },

    // GET /api/countries/:id - Buscar país por ID
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const country = await prisma.country.findUnique({
                where: { id: parseInt(id) },
                include: {
                    continent: true,
                    cities: true
                }
            });

            if (!country) {
                return res.status(404).json({ error: 'País não encontrado' });
            }

            res.json(country);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar país' });
        }
    },

    // POST /api/countries - Criar país
    async create(req: Request, res: Response) {
        try {
            const { name, code, continentId } = req.body;

            if (!name || !code || !continentId) {
                return res.status(400).json({
                    error: 'Nome, código e continentId são obrigatórios'
                });
            }

            const country = await prisma.country.create({
                data: {
                    name,
                    code: code.toUpperCase(),
                    continentId: parseInt(continentId)
                },
                include: {
                    continent: true
                }
            });

            res.status(201).json(country);
        } catch (error: any) {
            if (error.code === 'P2002') {
                res.status(400).json({ error: 'País ou código já existe' });
            } else {
                res.status(500).json({ error: 'Erro ao criar país' });
            }
        }
    },

    // PUT /api/countries/:id - Atualizar país
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, code, continentId } = req.body;

            const country = await prisma.country.update({
                where: { id: parseInt(id) },
                data: {
                    ...(name && { name }),
                    ...(code && { code: code.toUpperCase() }),
                    ...(continentId && { continentId: parseInt(continentId) })
                },
                include: {
                    continent: true,
                    cities: true
                }
            });

            res.json(country);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar país' });
        }
    },

    // DELETE /api/countries/:id - Deletar país
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.country.delete({
                where: { id: parseInt(id) }
            });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar país' });
        }
    }
};