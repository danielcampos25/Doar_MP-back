import { Injectable, NotFoundException } from '@nestjs/common'; 
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import transporter from 'src/nodemailer';

@Injectable()
export class TrackingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackingDto: CreateTrackingDto) {
    // Assertivas de Entrada:
    // - createTrackingDto: Deve ser um objeto válido com `doacaoID`, `localizacao`, e `status`.

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
        text: `O objeto doado de id ${tracking.doacaoID} esta em localização: "${tracking.localizacao}".`,
      });
    } else {
      throw new NotFoundException(`Email do usuário com ID ${donation.usuarioID} não encontrado.`);
    }

    // Assertiva de Saída:
    // - Retorna um objeto contendo os dados do rastreamento recém-criado, incluindo `id`, `createdAt` e `updatedAt`.

    return {
      id: tracking.id,
      ...createTrackingDto,
      createdAt: tracking.createdAt,
      updatedAt: tracking.updatedAt,
    };
  }

  async findAll() {
    // Assertivas de Entrada:
    // - Nenhuma entrada específica é necessária.

    // Assertiva de Saída:
    // - Retorna uma lista de rastreamentos.

    return this.prisma.rastreamento.findMany();
  }

  async findOne(id: number) {
    // Assertivas de Entrada:
    // - id: Deve ser um número inteiro válido representando o ID do rastreamento.

    const tracking = await this.prisma.rastreamento.findUnique({
      where: { id },
    });

    if (!tracking) {
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }

    // Assertiva de Saída:
    // - Se encontrado, retorna o rastreamento correspondente.

    return tracking;
  }

  async update(id: number, updateTrackingDto: UpdateTrackingDto) {
    // Assertivas de Entrada:
    // - id: Deve ser um número inteiro válido que representa o ID do rastreamento a ser atualizado.
    // - updateTrackingDto: Deve conter campos válidos para atualização.

    await this.findOne(id); // Verifica se o rastreamento existe antes de atualizar

    // Assertiva de Saída:
    // - Retorna os dados do rastreamento atualizado.

    return this.prisma.rastreamento.update({
      where: { id },
      data: updateTrackingDto,
    });
  }

  async remove(id: number) {
    // Assertivas de Entrada:
    // - id: Deve ser um número inteiro válido que representa o ID do rastreamento a ser removido.

    await this.findOne(id); // Verifica se o rastreamento existe antes de remover

    // Assertiva de Saída:
    // - Remove o rastreamento e retorna a confirmação de exclusão.

    return this.prisma.rastreamento.delete({
      where: { id },
    });
  }

  async findByDonationId(doacaoID: number) {
    // Assertivas de Entrada:
    // - doacaoID: Deve ser um número inteiro válido representando o ID da doação.

    const trackings = await this.prisma.rastreamento.findMany({
      where: {
        doacaoID: doacaoID,
      },
    });

    // Assertiva de Saída:
    // - Retorna uma lista de rastreamentos associados ao ID da doação fornecido.

    return trackings;
  }
}