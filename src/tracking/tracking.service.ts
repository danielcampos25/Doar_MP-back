import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import transporter from 'src/nodemailer';
@Injectable()
export class TrackingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackingDto: CreateTrackingDto) {
    const tracking = await this.prisma.rastreamento.create({
      data: createTrackingDto,
    });

    // Obter a doação associada ao rastreamento
    const donation = await this.prisma.doacao.findUnique({
      where: { id: tracking.doacaoID },
      include: {
        usuario: true, // Inclui o usuário associado
      },
    });

    if (!donation) {
      throw new NotFoundException(`Doação com ID ${tracking.doacaoID} não encontrada.`);
    }

    // Verifica se o usuário existe e tem um e-mail válido
    if (donation.usuario && donation.usuario.email) {
      await transporter.sendMail({
        from: 'doarpontocom@gmail.com',
        to: donation.usuario.email, 
        subject: 'Novo Rastreamento Criado',
        text: `O objeto doado de id ${tracking.doacaoID} esta em 
        localização: "${tracking.localizacao}".`,
      });
    } else {
      throw new NotFoundException(`Email do usuário com ID ${donation.usuarioID} não encontrado.`);
    }

    return {
      id: tracking.id,
      ...createTrackingDto,
      createdAt: tracking.createdAt,
      updatedAt: tracking.updatedAt,
    };
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
      where: {
        doacaoID: doacaoID, // Certifique-se de que doacaoID é um número
      },
    });
    return trackings;
  }
}
