import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersController {
    private readonly usersService;
    private readonly prisma;
    private readonly client;
    constructor(usersService: UsersService, prisma: PrismaService, client: ClientProxy);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    handleUserLogCreated(data: CreateUserLogDto): Promise<{
        id: number;
        createdAt: Date;
        action: string;
        idUser: number | null;
        nameUser: string | null;
    } | undefined>;
    findAllLogs(): Promise<{
        id: number;
        createdAt: Date;
        action: string;
        idUser: number | null;
        nameUser: string | null;
    }[]>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
