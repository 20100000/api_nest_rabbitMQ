import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Deixa o módulo visível na aplicação toda sem precisar importar de novo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
