// backend/src/controllers/continent.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../services/prisma.service';


export const continentController = {
    async getAll(req: Request, res: Response) {
        try {
            const continents = await prisma.continent.findMany({
                include: {
                    countries: {
                        include: {
                            cities: true
                        }
                    }
                }
            });
            res.json(continents);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar continentes' });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const continent = await prisma.continent.findUnique({
                where: { id: parseInt(id) },
                include: { countries: true }
            });

            if (!continent) {
                return res.status(404).json({ error: 'Continente não encontrado' });
            }

            res.json(continent);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar continente' });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Nome é obrigatório' });
            }

            const continent = await prisma.continent.create({
                data: { name }
            });

            res.status(201).json(continent);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar continente' });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const continent = await prisma.continent.update({
                where: { id: parseInt(id) },
                data: { name }
            });

            res.json(continent);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar continente' });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.continent.delete({
                where: { id: parseInt(id) }
            });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar continente' });
        }
    }
};