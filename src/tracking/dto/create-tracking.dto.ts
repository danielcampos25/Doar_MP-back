import { PickType } from '@nestjs/mapped-types'; 
import { TrackingEntity } from '../entities/tracking.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackingDto extends PickType(TrackingEntity, [
  'doacaoID',
  'localizacao',
  'status',
]) {
  @ApiProperty({
    description: 'ID da doação associada ao rastreamento',
    example: 123,
  })
  doacaoID: number; // Entrada: Deve ser um número inteiro válido representando o ID da doação.

  @ApiProperty({
    description: 'Localização onde o rastreamento está sendo realizado',
    example: 'São Paulo, Brasil',
  })
  localizacao: string; // Entrada: Deve ser uma string não vazia representando a localização.

  @ApiProperty({
    description: 'Status atual do rastreamento',
    example: 'Em trânsito',
  })
  status: string; // Entrada: Deve ser uma string representando o status atual do rastreamento.

  // Assertivas de Entrada:
  // - doacaoID: Deve ser um número inteiro válido.
  // - localizacao: Deve ser uma string não vazia.
  // - status: Deve ser uma string não vazia.

  // Assertiva de Saída:
  // - A saída deve ser um objeto CreateTrackingDto com os seguintes atributos:
  //   - doacaoID: número inteiro.
  //   - localizacao: string que representa a localização.
  //   - status: string que representa o status atual do rastreamento.
}