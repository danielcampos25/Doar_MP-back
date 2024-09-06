import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DonationEntity } from './entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createDonationDto: CreateDonationDto): Promise<DonationEntity> {
    // Use o Prisma para criar uma nova doação no banco de dados
    

    const donation = await this.prisma.doacao.create({
      data: {
        
        usuarioID: createDonationDto.usuarioID,
        destinatarioID: createDonationDto.destinatarioID,
        descricao: createDonationDto.descricao,
        qtdItens: createDonationDto.qtdItens,
        QRCode: createDonationDto.QRCode,
        codigoRastreamento: createDonationDto.codigoRastreamento,
        entregue: createDonationDto.entregue,
      },
    });

    return donation; 
  }

  async findAll(): Promise<DonationEntity[]> {
    return this.prisma.doacao.findMany();
  }

  async findOne(id: number): Promise<DonationEntity> {
    const donation = await this.prisma.doacao.findUnique({
      where: { id: id },
    });

    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }

    return donation;
  }

  async update(id: number, updateDonationDto: UpdateDonationDto): Promise<DonationEntity> {
    const donation = await this.prisma.doacao.update({
      where: { id },
      data: {
        usuarioID: updateDonationDto.usuarioID,
        destinatarioID: updateDonationDto.destinatarioID,
        descricao: updateDonationDto.descricao,
        qtdItens: updateDonationDto.qtdItens,
        QRCode: updateDonationDto.QRCode,
        codigoRastreamento: updateDonationDto.codigoRastreamento,
        entregue: updateDonationDto.entregue,
      },
    });

    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }

    return donation;
  }

  async remove(id: number): Promise<void> {
    const donation = await this.prisma.doacao.delete({
      where: { id },
    });

    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }

    
  }

  async entregaConcluida(id: number): Promise<DonationEntity> {
    const donation = await this.prisma.doacao.findUnique({
      where: { id },
    });
  
    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }
  
    const updatedDonation = await this.prisma.doacao.update({
      where: { id },
      data: {
        entregue: true, 
      },
    });
  
    return updatedDonation;
  }
}





  