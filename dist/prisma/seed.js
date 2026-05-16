"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando semeadura de dados (Seed)...');
    const user1 = await prisma.user.upsert({
        where: { email: 'alice@exemplo.com' },
        update: {},
        create: {
            email: 'alice@exemplo.com',
            name: 'Alice Silva',
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'bob@exemplo.com' },
        update: {},
        create: {
            email: 'bob@exemplo.com',
            name: 'Bob Santos',
        },
    });
    console.log({ user1, user2 });
    console.log('✅ Semeadura finalizada com sucesso!');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map