import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando semeadura de dados (Seed)...');

  // Cria ou atualiza o usuário 1
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@exemplo.com' },
    update: {},
    create: {
      email: 'alice@exemplo.com',
      name: 'Alice Silva',
    },
  });

  // Cria ou atualiza o usuário 2
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
