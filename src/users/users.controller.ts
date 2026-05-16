import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    @Inject('LOG_CLIENT') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    this.client.emit('user_log_event', {
      action: 'CREATE',
      idUser: newUser.id,
      nameUser: newUser.name,
    });

    return newUser;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    this.client.emit('user_log_event', {
      action: 'UPDATE',
      idUser: updatedUser.id,
      nameUser: updatedUser.name,
    });

    return updatedUser;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // Busca o usuário primeiro para capturar os dados do log antes de deletar
    const user = await this.usersService.findOne(id);

    this.client.emit('user_log_event', {
      action: 'DELETE',
      idUser: user.id,
      nameUser: user.name,
    });

    // Remove do PostgreSQL de fato
    await this.usersService.remove(id);

    return { message: `Usuário com ID ${id} removido com sucesso!` };
  }

  @EventPattern('user_log_event')
  async handleUserLogCreated(@Payload() data: CreateUserLogDto) {
    console.log(`📥 [RabbitMQ] Recebido log de ${data.action}. Salvando em 5 segundos...`);
    await delay(5000);

    try {
      const log = await this.prisma.userLogs.create({
        data: {
          action: data.action,
          idUser: data.idUser,
          nameUser: data.nameUser,
        },
      });
      console.log('📝 Log de auditoria persistido com sucesso:', log);
      return log;
    } catch (error) {
      console.error('⚠️ Não foi possível salvar o log de auditoria no banco:', error.message);
    }
  }

  @Get('logs')
  async findAllLogs() {
    return this.usersService.findAllLogs();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
