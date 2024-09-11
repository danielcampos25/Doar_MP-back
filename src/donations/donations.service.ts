import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DonationEntity } from './entities/donation.entity';
import transporter from 'src/nodemailer';
@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  //Assertivas de entrada:
  // - 'createDonationDto': objeto que contem os dados válidos para a criação da doação
  //Assertivas de saída:
  // - Retorna um objeto do tipo DonationEntity contendo os dados da doação criada.
  // - Em caso de sucesso, a doação é registrada no banco de dados com as informações fornecidas.
  async create(createDonationDto: CreateDonationDto): Promise<DonationEntity> {
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

  //Assertivas de saída:
  // - Retorna uma lista de objetos do tipo DonationEntity contendo todas as doações registradas.
  async findAll(): Promise<DonationEntity[]> {
    return this.prisma.doacao.findMany();
  }

  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo que corresponda ao ID da doação
  //Assertivas de saída:
  // - Retorna o objeto do tipo DonationEntity correspondente ao id fornecido.
  // - Se a doação não for encontrada, lança uma exceção NotFoundException.
  async findOne(id: number): Promise<DonationEntity> {
    const donation = await this.prisma.doacao.findUnique({
      where: { id },
    });

    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }

    return donation;
  }

  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo que corresponda ao ID da doação
  // - 'updateDonationDto': objeto contendo todas as informações válidas da doação ser atualizada
  //Assertivas de saída:
  // - Retorna o objeto atualizado do tipo DonationEntity.
  // - Se a doação não for encontrada, lança uma exceção
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

  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo que corresponda ao ID da doação
  //Assertivas de saída:
  // - Se a doação não for encontrada, lança uma exceção
  // - Não há retorno específico em caso de sucesso.
  async remove(id: number): Promise<void> {
    const donation = await this.prisma.doacao.delete({
      where: { id },
    });

    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }
  }

  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo que corresponda ao ID da doação
  //Assertivas de saída:
  // - Retorna o objeto do tipo DonationEntity atualizado com o campo entregue definido como true.
  // - Envia um e-mail de confirmação ao usuário associado à doação.
  // - Se a doação ou o e-mail do usuário não forem encontrados, lança uma exceção
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

    // Supondo que o email do usuário esteja relacionado ao ID do usuário
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
      throw new NotFoundException(`Email do usuário com ID ${donation.usuarioID} não encontrado`);
    }

    return updatedDonation;
  }

  
}
