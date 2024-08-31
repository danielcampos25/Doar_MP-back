import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

const UserSelection = {
  id: true,
  nome: true,
  email: true,
  fotoPerfil: true,
  endereco: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hashSync(createUserDto.senha, 10);

    return await this.prisma.usuario.create({
      data: { ...createUserDto, senha: hashedPassword },
      select: UserSelection,
    });
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      select: UserSelection,
    });
  }

  private async findUser(criterio: Prisma.UsuarioWhereUniqueInput) {
    if (!criterio.id && !criterio.email) {
      throw new Error('É necessário informar o id ou o email do usuário.');
    }
    const user = await this.prisma.usuario.findUnique({
      where: criterio,
      select: UserSelection,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findOne(id: number) {
    return this.findUser({ id });
  }

  async findByEmail(email: string) {
    return this.findUser({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.usuario.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (updateUserDto.senha) {
      updateUserDto.senha = await bcrypt.hashSync(updateUserDto.senha, 10);
    }

    if (updateUserDto.email) {
      const existingUser = await this.prisma.usuario.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          'Este e-mail já está em uso por outro usuário.',
        );
      }
    }

    return await this.prisma.usuario.update({
      where: { id },
      data: { ...updateUserDto },
      select: UserSelection,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.usuario.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return await this.prisma.usuario.delete({
      where: { id },
      select: UserSelection,
    });
  }
}
