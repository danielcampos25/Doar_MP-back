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

  //Assertivas de entrada:
  // - 'createInstituicaoDto': objeto contendo os dados válidos para a criação da instituição
  // - o campo 'email' não pode estar associado a uma instituição já existente
  //Assertivas de saída:
  // - retorna um objeto do tipo InstituicaoType, contendo a insituição recém criada com senha criptografada
  // - se o e-mail ja estiver em uso, lança exceção
  async create(
    createInstituicaoDto: CreateInstituicaoDto,
  ): Promise<InstituicaoType> {
    const existingInstituicao = await this.prisma.instituicao.findUnique({
      where: { email: createInstituicaoDto.email },
    });
    if (existingInstituicao) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createInstituicaoDto.senha, 10);

    return await this.prisma.instituicao.create({
      data: { ...createInstituicaoDto, senha: hashedPassword },
      select: InstituicaoSelection,
    });
  }

  //Assertivas de saída:
  // - retorna uma lista com todas as instituições cadastradas, do tipo InstituicaoType, com status 200
  async findAll(): Promise<InstituicaoType[]> {
    return await this.prisma.instituicao.findMany({
      select: InstituicaoSelection,
    });
  }

  //Assertivas de entrada:
  // - 'criterio': objeto contendo os criterios para busca ('email' e 'id')
  //Assertivas de saída:
  // - retorna os dados da insituição correspondente ao ID informado
  // -  se a instituição não for encontrada, lança exceção
  // -  se o 'id' não for válido, lança exceção
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

  //Assertivas de entrada:
  // - 'id': deve ser um número não nula que represente o ID da instituição
  //Assertivas de saída:
  // - retorna os dados da insituição correspondente ao ID informado
  // -  se a instituição não for encontrada, lança exceção
  // -  se o 'id' não for válido, lança exceção
  async findOne(id: number) {
    return this.findInstituicao({ id });
  }
  //Assertivas de entrada:
  // - 'email': deve ser uma string não vazia que contenha um e-mail válido
  //Assertivas de saída:
  // - retorna os dados da insituição correspondente ao email informado
  // - se a instituição não for encontrada, lança exceção
  // - se o 'email' não for válido, lança exceção
  async findByEmail(email: string) {
    return this.findInstituicao({ email });
  }

  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo correspondente ao ID da instituição
  // - 'updateInstituicaoDto': objeto contendo os dados válidos a serem atualizados
  //Assertivas de saída:
  // - Retorna os dados atualizados da instituição
  // - Se a instituição não for encontrada, lança uma exceção
  // - Se o e-mail fornecido já estiver em uso por outra instituição, lança uma exceção
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

  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo que corresponda ao ID da instituição
  //Assertivas de saída:
  // - retorna os dados da instituição removida
  // - Se a instituição não for encontrada, lança uma exceção
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

  //Assertivas de entrada:
  // - 'file': objeto que contém um arquivo válido enviado via upload
  // - 'id': deve ser um número não nulo que corresponda ao ID da instituição
  //Assertivas de saída:
  // - Retorna o caminho onde a foto foi armazenada no servidor.
  // - Se o arquivo não for fornecido, lança uma exceção
  // - Se a instituição não for encontrada, lança uma exceção
  async uploadInstitutionPic(file: Express.Multer.File, id: number): Promise<string> {
    if (!file) {
      throw new BadRequestException('Arquivo não fornecido');
    }

    const instituicao = await this.prisma.instituicao.findUnique({
      where: { id },
    });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada.');
    }

    const uploadPath = path.join(__dirname, '..', '..','uploads', 'upload-institution-photo');
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

  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo que corresponda ao ID da instituição
  // - 'res': objeto que receberá,e depois retornará a foto ao usuário
  //Assertivas de saída:
  // - Retorna a foto da instituição como um fluxo de dados (stream) de imagem.
  // - Se a instituição ou a foto não forem encontradas, lança uma exceção
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
