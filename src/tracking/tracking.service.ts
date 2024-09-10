import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import transporter from '../nodemailer';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class TrackingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(doacaoID: number, createTrackingDto: CreateTrackingDto, foto?: Express.Multer.File) {
    // Adiciona o ID da doação ao DTO
    const trackingData = {
      ...createTrackingDto,
      doacaoID, // Usa o ID da doação recebido como parâmetro
    };

    // Se houver uma foto, faça o upload
    let filePath = '';
    if (foto) {
      filePath = await this.uploadTrackingPic(foto, doacaoID);
      trackingData.fotoRastreamento = filePath; // Adiciona o caminho da foto ao DTO
    }

    const tracking = await this.prisma.rastreamento.create({
      data: trackingData,
    });

    // Obter a doação associada ao rastreamento
    const donation = await this.prisma.doacao.findUnique({
      where: { id: doacaoID }, // Usa o doacaoID recebido
      include: {
        usuario: true, // Inclui o usuário associado
      },
    });

    if (!donation) {
      throw new NotFoundException(`Doação com ID ${doacaoID} não encontrada.`);
    }

    // Verifica se o usuário existe e tem um e-mail válido
    if (donation.usuario && donation.usuario.email) {
      // Enviar o e-mail com a imagem embutida
      const emailOptions = {
        from: 'doarpontocom@gmail.com',
        to: donation.usuario.email,
        subject: 'Novo Rastreamento Criado',
        html: `
          <p>O objeto doado de ID ${tracking.doacaoID} está em localização: "${tracking.localizacao}".</p>
          <p>Aqui está a imagem associada ao rastreamento:</p>
          <img src="cid:trackingImage" alt="Imagem do rastreamento" style="max-width: 600px;"/>
        `,
        attachments: [
          {
            filename: path.basename(filePath), // Nome do arquivo da imagem
            path: filePath, // Caminho da imagem
            cid: 'trackingImage' // O CID que será usado no HTML
          },
        ],
      };

      await transporter.sendMail(emailOptions);
    } else {
      throw new NotFoundException(
        `Email do usuário com ID ${donation.usuarioID} não encontrado.`,
      );
    }

    return {
      id: tracking.id,
      ...trackingData,
      createdAt: tracking.createdAt,
      updatedAt: tracking.updatedAt,
    };
  }


  async uploadTrackingPic(
    file: Express.Multer.File,
    trackingId: number,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Arquivo não fornecido');
    }

    const uploadDir = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'upload-tracking-photo',
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, `${trackingId}-${file.originalname}`);

    // Salvar o arquivo
    fs.writeFileSync(filePath, file.buffer);

    // Atualizar a foto do rastreamento no banco de dados
    await this.prisma.rastreamento.update({
      where: { id: trackingId },
      data: { fotoRastreamento: filePath }, // Supondo que a coluna foto existe na tabela de rastreamento
    });

    return filePath; // Retorne o caminho do arquivo salvo
  }

  async findAll() {
    return this.prisma.rastreamento.findMany();
  }

  async findOne(id: number) {
    const tracking = await this.prisma.rastreamento.findUnique({
      where: { id },
    });

    if (!tracking) {
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }

    return tracking;
  }

  async update(id: number, updateTrackingDto: UpdateTrackingDto) {
    await this.findOne(id); // Verifica se o rastreamento existe antes de atualizar

    return this.prisma.rastreamento.update({
      where: { id },
      data: updateTrackingDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se o rastreamento existe antes de remover

    return this.prisma.rastreamento.delete({
      where: { id },
    });
  }
  async findByDonationId(doacaoID: number) {
    const trackings = await this.prisma.rastreamento.findMany({
      where: { doacaoID },
    });
    if (trackings.length === 0) {
      throw new Error(`No tracking found for donation ID ${doacaoID}`);
    }
    return trackings;
  }
}
