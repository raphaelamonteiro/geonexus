import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE ==========================
export const createFavorite = async (req: Request, res: Response) => {
    try {
        const { name, code, continent, city, note } = req.body;

        const favorite = await prisma.favoriteCountry.create({
            data: { name, code, continent, city, note }
        });

        res.json(favorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao favoritar país" });
    }
};

// READ ============================
export const getFavorites = async (req: Request, res: Response) => {
    const favorites = await prisma.favoriteCountry.findMany();
    res.json(favorites);
};

// UPDATE ==========================
export const updateFavorite = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, city, continent, note } = req.body;

        const updated = await prisma.favoriteCountry.update({
            where: { id: Number(id) },
            data: { name, city, continent, note },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar favorito" });
    }
};

// DELETE ==========================
export const deleteFavorite = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.favoriteCountry.delete({
            where: { id: Number(id) }
        });

        res.json({ message: "Favorito removido!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar favorito" });
    }
};
