import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';
import * as mime from 'mime-types';

@Injectable()
export class MediasService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File, createMediaDto: CreateMediaDto) {
    if (!file) {
      throw new Error('Arquivo não fornecido');
    }

    console.log('File:', file); // Adicionando log para verificar o arquivo recebido

    const uploadPath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'uploads-midias',
    );
    const filePath = path.join(uploadPath, file.originalname); // Usando file.originalname

    console.log(`Upload Path: ${uploadPath}`);
    console.log(`File Path: ${filePath}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Verifique se file.buffer está definido
    if (!file.buffer) {
      throw new Error('Buffer do arquivo não encontrado');
    }

    fs.writeFileSync(filePath, file.buffer); // Gravar o arquivo

    // Salva as informações no banco de dados
    const newMedia = await this.prisma.midias.create({
      data: {
        tipo: createMediaDto.tipo,
        rastreamentoID: createMediaDto.rastreamentoID,
        url: filePath,
      },
    });

    return newMedia;
  }

  async getMedia(mediaId: number, res): Promise<void> {
    // Buscar a mídia no banco de dados
    const media = await this.prisma.midias.findUnique({
      where: { id: mediaId },
      select: { url: true }, // Apenas o caminho do arquivo
    });

    if (!media || !media.url) {
      throw new NotFoundException('Mídia não encontrada.');
    }

    const filePath = media.url;

    // Verifica se o arquivo existe no sistema de arquivos
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo de mídia não encontrado.');
    }

    
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);

    // Faz o streaming do arquivo
    fs.createReadStream(filePath).pipe(res);
  }
}
