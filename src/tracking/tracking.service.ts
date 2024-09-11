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
  async create(
    doacaoID: number,
    createTrackingDto: CreateTrackingDto,
    foto?: Express.Multer.File, // Recebe o arquivo opcionalmente
  ) {
    // Crie o rastreamento primeiro
    const tracking = await this.prisma.rastreamento.create({
      data: {
        ...createTrackingDto,
        doacaoID, // Usa o ID da doação recebido como parâmetro
      },
    });

    // Faça o upload da foto, se fornecida
    let fotoPath: string | null = null;
    if (foto) {
      fotoPath = await this.uploadTrackingPic(foto, tracking.id); // Usa o ID do rastreamento recém-criado
    }

    // Atualize o rastreamento com o caminho da foto
    if (fotoPath) {
      await this.prisma.rastreamento.update({
        where: { id: tracking.id },
        data: { fotoRastreamento: fotoPath }, // Atualiza o campo 'foto' com o caminho
      });
    }

    // Enviar email
    const donation = await this.prisma.doacao.findUnique({
      where: { id: doacaoID },
      include: { usuario: true },
    });

    if (!donation) {
      throw new NotFoundException(`Doação com ID ${doacaoID} não encontrada.`);
    }

    if (donation.usuario && donation.usuario.email) {
      await transporter.sendMail({
        from: 'doarpontocom@gmail.com',
        to: donation.usuario.email,
        subject: 'Novo Rastreamento Criado',
        text: `O objeto doado de id ${tracking.doacaoID} está em localização: "${tracking.localizacao}".`,
        attachments: fotoPath
          ? [{ filename: 'rastreamento.png', path: fotoPath }]
          : [],
      });
    }

    return tracking;
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
