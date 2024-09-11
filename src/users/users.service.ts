import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

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
    // Assertiva de Entrada:
    // - `createUserDto`: Um objeto contendo `nome`, `email`, `senha`, `fotoPerfil`, e `endereco`.
    // - O campo `email` deve ser único.
    
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    // Assertiva de Saída:
    // - Retorna o usuário criado com os campos definidos em `UserSelection`.
    return await this.prisma.usuario.create({
      data: { ...createUserDto, senha: hashedPassword },
      select: UserSelection,
    });
  }

  async findAll() {
    // Assertiva de Saída:
    // - Retorna uma lista de todos os usuários com os campos selecionados em `UserSelection`.
    return await this.prisma.usuario.findMany({
      select: UserSelection,
    });
  }

  private async findUser(criterio: Prisma.UsuarioWhereUniqueInput) {
    // Assertiva de Entrada:
    // - Deve ser fornecido `id` ou `email` para busca.
    
    if (!criterio.id && !criterio.email) {
      throw new BadRequestException(
        'É necessário informar o id ou o email do usuário.',
      );
    }

    const user = await this.prisma.usuario.findUnique({
      where: criterio,
    });

    // Assertiva de Saída:
    // - Se o usuário for encontrado, retorna os dados do usuário.
    // - Se não for encontrado, lança uma `NotFoundException`.
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findOne(id: number) {
    // Assertiva de Entrada:
    // - `id`: Um número que corresponde ao ID de um usuário existente.
    // Assertiva de Saída:
    // - Retorna os dados do usuário encontrado.
    return this.findUser({ id });
  }

  async findByEmail(email: string) {
    // Assertiva de Entrada:
    // - `email`: Um e-mail válido para busca.
    // Assertiva de Saída:
    // - Retorna os dados do usuário encontrado.
    return this.findUser({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Assertiva de Entrada:
    // - `id`: Um número válido de um usuário existente.
    // - `updateUserDto`: Um objeto que pode conter novos valores de `nome`, `email`, `senha`, `fotoPerfil`, e `endereco`.

    const user = await this.prisma.usuario.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (updateUserDto.senha) {
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10);
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

    // Assertiva de Saída:
    // - Retorna o usuário atualizado com os campos definidos em `UserSelection`.
    return await this.prisma.usuario.update({
      where: { id },
      data: { ...updateUserDto },
      select: UserSelection,
    });
  }

  async remove(id: number) {
    // Assertiva de Entrada:
    // - `id`: Um número válido de um usuário existente.

    const user = await this.prisma.usuario.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    // Assertiva de Saída:
    // - Retorna os dados do usuário removido.
    return await this.prisma.usuario.delete({
      where: { id },
      select: UserSelection,
    });
  }

  async uploadUserPic(file: Express.Multer.File, userId: number): Promise<string> {
    // Assertiva de Entrada:
    // - `file`: Um arquivo de imagem válido.
    // - `userId`: O ID de um usuário existente.

    if (!file) {
      throw new BadRequestException('Arquivo não fornecido');
    }

    const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'upload-user-photo');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, `${userId}-${file.originalname}`);
    
    // Salvar o arquivo
    fs.writeFileSync(filePath, file.buffer);

    // Atualizar a foto do perfil no banco de dados
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { fotoPerfil: filePath },
    });

    // Assertiva de Saída:
    // - Retorna o caminho do arquivo salvo.
    return filePath;
  }

  async getUserPic(userId: number, res): Promise<void> {
    // Assertiva de Entrada:
    // - `userId`: O ID de um usuário existente.

    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: { fotoPerfil: true },
    });

    if (!user || !user.fotoPerfil) {
      throw new NotFoundException('Foto de perfil não encontrada.');
    }

    const filePath = user.fotoPerfil;

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo de imagem não encontrado.');
    }

    // Assertiva de Saída:
    // - Retorna a foto de perfil como um stream de resposta.
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);

    fs.createReadStream(filePath).pipe(res);
  }
}