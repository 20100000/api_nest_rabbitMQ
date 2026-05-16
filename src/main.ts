import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'; // Importes necessários

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configura a API como um Microserviço que escuta o RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'user_logs_queue', // Nome da fila que vai receber as mensagens
      queueOptions: {
        durable: true,
      },
    },
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API com RabbitMQ e Prisma')
    .setDescription('Documentação dos endpoints')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 2. Inicia os Microserviços conectados antes de subir o servidor HTTP
  await app.startAllMicroservices();

  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
