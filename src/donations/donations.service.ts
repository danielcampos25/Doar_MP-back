import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DonationEntity } from './entities/donation.entity';
import transporter from '../nodemailer';
import * as fs from 'fs';
import * as QRCode from 'qrcode';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDonationDto: CreateDonationDto): Promise<DonationEntity> {
    const qrCodeDir = join(__dirname, '..', '..', 'uploads', 'upload-qrcode');
  
    // Verifica se o diretório existe, caso contrário, cria-o
    if (!fs.existsSync(qrCodeDir)) {
      fs.mkdirSync(qrCodeDir, { recursive: true });
    }
  
    // Salva a doação no banco de dados sem o QRCode inicialmente
    const donation = await this.prisma.doacao.create({
      data: {
        usuarioID: createDonationDto.usuarioID,
        destinatarioID: createDonationDto.destinatarioID,
        descricao: createDonationDto.descricao,
        titulo: createDonationDto.titulo,
        QRCode: '',  // QRCode será atualizado depois
        qtdItens: createDonationDto.qtdItens,
        codigoRastreamento: createDonationDto.codigoRastreamento,
        entregue: createDonationDto.entregue,
      },
    });
  
    // Caminho absoluto para salvar o arquivo QR Code no sistema de arquivos
    const qrCodeFileName = `doacao_${donation.id}.png`;
    const qrCodeAbsolutePath = join(qrCodeDir, qrCodeFileName);
  
    // Caminho relativo para ser usado no frontend
    const qrCodeRelativePath = `/uploads/upload-qrcode/${qrCodeFileName}`;
  
    try {
      // Gera o QR code com o link para o rastreamento da doação
      const link = `http://localhost:3000/Rastreamento?doacaoID=${donation.id}`;
      await QRCode.toFile(qrCodeAbsolutePath, link, {
        color: {
          dark: '#0000FF',  // Cor do QR code
          light: '#FFFFFF',  // Cor de fundo
        },
      });
  
      // Atualiza a doação no banco de dados com o caminho relativo do QR Code
      const updatedDonation = await this.prisma.doacao.update({
        where: { id: donation.id },
        data: {
          QRCode: qrCodeRelativePath,  // Salva o caminho relativo para ser usado no frontend
        },
      });
  
      return updatedDonation;  // Retorna a doação atualizada com o QR Code
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

  async findByUser(userId: number): Promise<DonationEntity[]> {
    return this.prisma.doacao.findMany({
      where: { usuarioID: userId },
    });
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
        text: `A entrega do pedido ${id} foi confirmada com sucesso.`,
      });
    } else {
      throw new NotFoundException(
        `Email do usuário com ID ${donation.usuarioID} não encontrado`,
      );
    }

    return updatedDonation;
  }
}
