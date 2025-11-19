import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class FavoriteService {

    async create(code: string, name: string, note?: string) {
        return prisma.favoriteCountry.create({
            data: { code, name, note }
        });
    }

    async findAll() {
        return prisma.favoriteCountry.findMany({
            orderBy: { createdAt: "desc" }
        });
    }

    async findOne(id: number) {
        return prisma.favoriteCountry.findUnique({
            where: { id }
        });
    }

    async update(id: number, note: string) {
        return prisma.favoriteCountry.update({
            where: { id },
            data: { note }
        });
    }

    async delete(id: number) {
        return prisma.favoriteCountry.delete({
            where: { id }
        });
    }
}
