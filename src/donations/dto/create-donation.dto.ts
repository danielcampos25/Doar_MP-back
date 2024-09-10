import { PickType } from '@nestjs/mapped-types';
import { DonationEntity } from '../entities/donation.entity';

export class CreateDonationDto extends PickType(DonationEntity, [
  'descricao',
  'qtdItens',

  'codigoRastreamento',
  'entregue',
  'usuarioID',
  'destinatarioID',
]) {}
