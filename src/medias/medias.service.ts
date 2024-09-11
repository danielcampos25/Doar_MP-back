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
    // Assertivas de Entrada:
    // - file: Deve ser um objeto válido do tipo `Express.Multer.File`, não deve ser null ou undefined.
    // - createMediaDto: Deve ser uma instância válida de `CreateMediaDto` com `tipo` como string e `rastreamentoID` como número.

    if (!file) {
      throw new Error('Arquivo não fornecido'); // Validação de entrada
    }

    console.log('File:', file); // Verificação do arquivo recebido

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

    // Verifica se o diretório de upload existe, e o cria se necessário
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Assertiva de Entrada:
    // - file.buffer: Deve estar presente, contendo os dados binários do arquivo.
    if (!file.buffer) {
      throw new Error('Buffer do arquivo não encontrado');
    }

    fs.writeFileSync(filePath, file.buffer); // Grava o arquivo no sistema

    // Salva as informações da mídia no banco de dados
    const newMedia = await this.prisma.midias.create({
      data: {
        tipo: createMediaDto.tipo,                // Deve ser uma string válida (assertiva de CreateMediaDto)
        rastreamentoID: createMediaDto.rastreamentoID,  // Deve ser um número inteiro (assertiva de CreateMediaDto)
        url: filePath,                            // Caminho do arquivo salvo
      },
    });

    // Assertiva de Saída:
    // - Deve retornar um objeto representando a nova mídia criada com sucesso no banco de dados.
    return newMedia;
  }

  async getMedia(mediaId: number, res): Promise<void> {
    // Assertiva de Entrada:
    // - mediaId: Deve ser um número válido que representa o ID de uma mídia existente.

    // Busca a mídia no banco de dados
    const media = await this.prisma.midias.findUnique({
      where: { id: mediaId },
      select: { url: true }, // Apenas o caminho do arquivo é necessário
    });

    // Assertiva de Entrada:
    // - media: Deve existir no banco de dados.
    if (!media || !media.url) {
      throw new NotFoundException('Mídia não encontrada.');
    }

    const filePath = media.url;

    // Verifica se o arquivo existe no sistema de arquivos
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo de mídia não encontrado.');
    }

    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType); // Define o tipo MIME da resposta

    // Assertiva de Saída:
    // - Deve realizar o streaming do arquivo existente corretamente para o cliente.
    fs.createReadStream(filePath).pipe(res); // Streaming do arquivo
  }
}