import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const InstituicaoSelection = {
  id: true,
  razaoSocial: true,
  email: true,
  fotoPerfil: true,
  endereco: true,
};

type InstituicaoType = Prisma.InstituicaoGetPayload<{
  select: typeof InstituicaoSelection;
}>;

@Injectable()
export class InstituicaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createInstituicaoDto: CreateInstituicaoDto,
    fotoPerfil?: Express.Multer.File, // Adiciona o arquivo da foto de perfil
  ): Promise<InstituicaoType> {
    const existingInstituicao = await this.prisma.instituicao.findUnique({
      where: { email: createInstituicaoDto.email },
    });
    if (existingInstituicao) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createInstituicaoDto.senha, 10);

    const createdInstituicao = await this.prisma.instituicao.create({
      data: { ...createInstituicaoDto, senha: hashedPassword },
      select: InstituicaoSelection,
    });

    if (fotoPerfil) {
      await this.uploadInstitutionPic(fotoPerfil, createdInstituicao.id);
    }

    return createdInstituicao;
  }

  async findAll(): Promise<InstituicaoType[]> {
    return await this.prisma.instituicao.findMany({
      select: InstituicaoSelection,
    });
  }

  private async findInstituicao(criterio: Prisma.InstituicaoWhereUniqueInput) {
    if (!criterio.id && !criterio.email) {
      throw new BadRequestException(
        'É necessário informar o id ou o email da Instituição.',
      );
    }
    const instituicao = await this.prisma.instituicao.findUnique({
      where: criterio,
    });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada.');
    }

    return instituicao;
  }

  async findOne(id: number) {
    return this.findInstituicao({ id });
  }

  async findByEmail(email: string) {
    return this.findInstituicao({ email });
  }

  async getDonations(id: number) {
    const instituicao = await this.prisma.instituicao.findUnique({
      where: { id },
      include: {
        doacoes: true, // Incluir doações associadas
      },
    });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada.');
    }

    return instituicao.doacoes;
  }

  async update(
    id: number,
    updateInstituicaoDto: UpdateInstituicaoDto,
  ): Promise<InstituicaoType> {
    const instituicao = await this.prisma.instituicao.findUnique({
      where: { id },
    });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada.');
    }

    if (updateInstituicaoDto.senha) {
      updateInstituicaoDto.senha = await bcrypt.hash(
        updateInstituicaoDto.senha,
        10,
      );
    }

    if (updateInstituicaoDto.email) {
      const existingInstituicao = await this.prisma.instituicao.findUnique({
        where: { email: updateInstituicaoDto.email },
      });

      if (existingInstituicao && existingInstituicao.id !== id) {
        throw new ConflictException(
          'Este e-mail já está em uso por outra instituição.',
        );
      }
    }

    return await this.prisma.instituicao.update({
      where: { id },
      data: { ...updateInstituicaoDto },
      select: InstituicaoSelection,
    });
  }

  async remove(id: number): Promise<InstituicaoType> {
    const instituicao = await this.prisma.instituicao.findUnique({
      where: { id },
    });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada.');
    }

    return await this.prisma.instituicao.delete({
      where: { id },
      select: InstituicaoSelection,
    });
  }

  async uploadInstitutionPic(
    file: Express.Multer.File,
    id: number,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Arquivo não fornecido');
    }

    const instituicao = await this.prisma.instituicao.findUnique({
      where: { id },
    });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada.');
    }

    const uploadPath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'upload-institution-photo',
    );
    const filePath = path.join(uploadPath, file.originalname);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    await this.prisma.instituicao.update({
      where: { id },
      data: { fotoPerfil: filePath },
    });

    return filePath;
  }

  async getInstitutionPic(id: number, res): Promise<void> {
    const instituicao = await this.prisma.instituicao.findUnique({
      where: { id },
      select: { fotoPerfil: true },
    });

    if (!instituicao || !instituicao.fotoPerfil) {
      throw new NotFoundException('Foto não encontrada.');
    }

    const filePath = instituicao.fotoPerfil;

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo de imagem não encontrado.');
    }

    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(filePath).pipe(res);
  }
}
