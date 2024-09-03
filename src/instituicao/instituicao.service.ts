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
  ): Promise<InstituicaoType> {
    const existingInstituicao = await this.prisma.instituicao.findUnique({
      where: { email: createInstituicaoDto.email },
    });
    if (existingInstituicao) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hashSync(
      createInstituicaoDto.senha,
      10,
    );

    return await this.prisma.instituicao.create({
      data: { ...createInstituicaoDto, senha: hashedPassword },
      select: InstituicaoSelection,
    });
  }

  async findAll(): Promise<InstituicaoType[]> {
    return await this.prisma.instituicao.findMany({
      select: InstituicaoSelection,
    });
  }

  private async findInstituicao(
    criterio: Prisma.InstituicaoWhereUniqueInput,
  ): Promise<InstituicaoType> {
    if (!criterio.id && !criterio.email) {
      throw new BadRequestException(
        'É necessário informar o id ou o email da Instituição.',
      );
    }
    const instituicao = await this.prisma.instituicao.findUnique({
      where: criterio,
      select: InstituicaoSelection,
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
      updateInstituicaoDto.senha = await bcrypt.hashSync(
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
}
