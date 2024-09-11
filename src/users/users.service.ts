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

  // Função para criar um novo usuário
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    return await this.prisma.usuario.create({
      data: { ...createUserDto, senha: hashedPassword },
      select: UserSelection,
    });
  }

  // Função para listar todos os usuários
  async findAll() {
    return await this.prisma.usuario.findMany({
      select: UserSelection,
    });
  }

  // Função para encontrar um único usuário pelo ID
  private async findUser(criterio: Prisma.UsuarioWhereUniqueInput) {
    if (!criterio.id && !criterio.email) {
      throw new BadRequestException(
        'É necessário informar o id ou o email do usuário.',
      );
    }
    const user = await this.prisma.usuario.findUnique({
      where: criterio,
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

  // Função para atualizar um usuário
  async update(id: number, updateUserDto: UpdateUserDto) {
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

    return await this.prisma.usuario.update({
      where: { id },
      data: { ...updateUserDto },
      select: UserSelection,
    });
  }

  // Função para remover um usuário
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

  // Função para upload de foto de perfil do usuário
  async uploadUserPic(file: Express.Multer.File, userId: number): Promise<string> {
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
      data: { fotoPerfil: filePath }, // Atualize com o caminho desejado
    });

    return filePath; // Retorne o caminho do arquivo salvo
  }

  // Função para obter a foto de perfil de um usuário
  async getUserPic(userId: number, res): Promise<void> {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: { fotoPerfil: true }, // Pegando apenas a foto de perfil
    });
  
    if (!user || !user.fotoPerfil) {
      throw new NotFoundException('Foto de perfil não encontrada.');
    }
  
    const filePath = user.fotoPerfil;
  
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo de imagem não encontrado.');
    }
  
    // Detecta o tipo MIME da imagem
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
  
    // Faz o streaming do arquivo de imagem
    fs.createReadStream(filePath).pipe(res);
  }
}
