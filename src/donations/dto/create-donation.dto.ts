import { PickType } from '@nestjs/mapped-types';
import { DonationEntity } from '../entities/donation.entity';
import{ ApiProperty } from '@nestjs/swagger';

export class CreateDonationDto extends PickType(DonationEntity, [
  'descricao',
  'qtdItens',
  'QRCode',
  'codigoRastreamento',
  'entregue',
  'usuarioID',
  'destinatarioID',
]) {
  @ApiProperty({ 
    description: 'Descrição da doação',
    example: 'Roupa usada em bom estado'
  })
  descricao: string;

  @ApiProperty({
    description: 'Quantidade de itens',
    example: 4
  })
  qtdItens: number;

  @ApiProperty({
    description: 'QR code gerado para a doação',
    example: 'QRCode_String'
  })
  QRCode: string;

  @ApiProperty({
    description: 'Código de rastreamento da doação',
    example: 'BR123456789'
  })
  codigoRastreamento: string;

  @ApiProperty({
    description: 'Status da entrega',
    example: true
  })
  entregue: boolean;

  @ApiProperty({
    description: 'ID do usuário que fez a doação',
    example: 1027
  })
  usuarioID: number;

  @ApiProperty({
    description: 'ID do usuário que receberá a doação',
    example: 2
  })
  destinatarioID: number;
}
