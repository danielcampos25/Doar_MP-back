import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DonationEntity } from './entities/donation.entity';
import transporter from '../nodemailer';
import * as fs from 'fs';
import * as QRCode from 'qrcode';
import * as path from 'path';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDonationDto: CreateDonationDto): Promise<DonationEntity> {
    const qrCodeDir = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'upload-qrcode',
    );

    // Verifica se o diretório existe, caso contrário, cria-o
    if (!fs.existsSync(qrCodeDir)) {
      fs.mkdirSync(qrCodeDir, { recursive: true });
    }

    // Salva a doação no banco de dados
    const donation = await this.prisma.doacao.create({
      data: {
        usuarioID: createDonationDto.usuarioID,
        destinatarioID: createDonationDto.destinatarioID,
        descricao: createDonationDto.descricao,
        QRCode: '',
        qtdItens: createDonationDto.qtdItens,
        codigoRastreamento: createDonationDto.codigoRastreamento,
        entregue: createDonationDto.entregue,
      },
    });

    const qrCodePath = path.join(
      qrCodeDir,
      `doacao_${donation.codigoRastreamento}.png`,
    );

    try {
      const link = `http://localhost:3000/Rastreamento?doacaoID=${donation.id}`; // URL com o ID da doação como parâmetro de consulta
      await QRCode.toFile(qrCodePath, link, {
        color: {
          dark: '#0000FF',
          light: '#FFFFFF',
        },
      });

      // Atualiza a doação para incluir o caminho do QR Code gerado
      const updatedDonation = await this.prisma.doacao.update({
        where: { id: donation.id },
        data: {
          QRCode: qrCodePath, // Salva o caminho do QR Code gerado
        },
      });

      return updatedDonation; // Retorna a doação atualizada com o QR Code
    } catch (error) {
      console.error('Erro ao gerar o QR Code:', error);
      throw new Error('Não foi possível gerar o QR Code');
    }
  }

  async findAll(): Promise<DonationEntity[]> {
    return this.prisma.doacao.findMany();
  }

  async findOne(id: number): Promise<DonationEntity> {
    const donation = await this.prisma.doacao.findUnique({
      where: { id },
    });

    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }

    return donation;
  }

  async update(
    id: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<DonationEntity> {
    const donation = await this.prisma.doacao.update({
      where: { id },
      data: {
        usuarioID: updateDonationDto.usuarioID,
        destinatarioID: updateDonationDto.destinatarioID,
        descricao: updateDonationDto.descricao,
        qtdItens: updateDonationDto.qtdItens,
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

    const user = await this.prisma.usuario.findUnique({
      where: { id: donation.usuarioID },
    });

    if (user && user.email) {
      await transporter.sendMail({
        from: 'doarpontocom@gmail.com',
        to: user.email,
        subject: 'Entrega confirmada',
        text: `A entrega do pedido ${id} foi confirmada com sucesso, visite o site para acompanhar as imagens de entrega.`,
      });
    } else {
      throw new NotFoundException(
        `Email do usuário com ID ${donation.usuarioID} não encontrado`,
      );
    }

    return updatedDonation;
  }
}
