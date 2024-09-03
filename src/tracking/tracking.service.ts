import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

@Injectable()
export class TrackingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackingDto: CreateTrackingDto) {
    const tracking = await this.prisma.rastreamento.create({
      data: createTrackingDto,
    });

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
