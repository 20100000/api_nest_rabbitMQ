import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Instancia o Pool nativo do Postgres usando a string do Docker Compose
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // 2. Cria o adaptador estruturado exigido pela engine do Prisma 7
    const clientAdapter = new PrismaPg(pool);

    // 3. Alimenta o construtor pai com o adapter de runtime validado
    super({ adapter: clientAdapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
