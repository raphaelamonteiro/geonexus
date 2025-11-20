// backend/src/test-db.ts
import { prisma } from './services/prisma.service'; // ← Importação corrigida

async function testDatabase() {
    try {
        console.log('🔌 Testando conexão com o banco...');

        await prisma.$connect();
        console.log('✅ Conectado ao banco de dados!');

        const result = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('✅ Query test:', result);

        // Testar criação de continente
        try {
            const continent = await prisma.continent.create({
                data: { name: 'América' }
            });
            console.log('✅ Continente criado:', continent);
        } catch (error: any) {
            if (error.code === 'P2002') {
                console.log('ℹ️  Continente já existe');
            }
        }

        console.log('🎉 Tudo funcionando!');

    } catch (error: any) {
        console.error('❌ Erro no teste:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();