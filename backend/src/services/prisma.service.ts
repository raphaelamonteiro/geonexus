// backend/src/test-db.ts
import { PrismaClient } from '@prisma/client'

// Usar diretamente sem o service por enquanto
export const prisma = new PrismaClient()

async function testDatabase() {
    try {
        console.log('🔌 Testando conexão com o banco...');

        // Testar conexão simples
        await prisma.$connect();
        console.log('✅ Conectado ao banco de dados!');

        // Testar uma query simples
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('✅ Query test:', result);

        console.log('🎉 Prisma Client funcionando!');

    } catch (error: any) {
        console.error('❌ Erro no teste:', error.message);
        if (error.code === 'P1001') {
            console.log('💡 Dica: Verifique se o MySQL está rodando e se o DATABASE_URL está correto no .env');
        }
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();