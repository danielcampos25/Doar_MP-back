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
  //Assertiva de entrada:
  // - deve ser uma string não vazia contendo a descrição da doação
  descricao: string;

  @ApiProperty({
    description: 'Quantidade de itens',
    example: 4
  })
  //Assertiva de entrada:
  // - deve ser um número não nulo contendo a quantidade de itens
  qtdItens: number;

  @ApiProperty({
    description: 'QR code gerado para a doação',
    example: 'QRCode_String'
  })
  //Assertiva de entrada:
  // - deve ser uma string não vazia contendo o codigo do QR_code gerado para a doação
  QRCode: string;

  @ApiProperty({
    description: 'Código de rastreamento da doação',
    example: 'BR123456789'
  })
  //Assertiva de entrada:
  // - deve ser uma string não vazia contendo o codigo de rastreamento da doação
  codigoRastreamento: string;

  @ApiProperty({
    description: 'Status da entrega',
    example: true
  })
  //Assertiva de entrada:
  // - deve ser um boolean ('true' ou 'false') que digam o status da entrega
  entregue: boolean;

  @ApiProperty({
    description: 'ID do usuário que fez a doação',
    example: 1027
  })
  //Assertiva de entrada:
  // - deve ser um número não nulo que represente o ID do usuário
  usuarioID: number;

  @ApiProperty({
    description: 'ID do usuário que receberá a doação',
    example: 2
  })
  //Assertiva de entrada:
  // - deve ser um número não nulo que represente o ID do destinatário
  destinatarioID: number;
}
