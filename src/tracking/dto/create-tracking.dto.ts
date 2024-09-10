import { PickType } from '@nestjs/mapped-types';
import { TrackingEntity } from '../entities/tracking.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackingDto extends PickType(TrackingEntity, [
  'doacaoID',
  'localizacao',
  'status',
  //'midias'//?,
]) {
  @ApiProperty({
    description: 'ID da doação associada ao rastreamento',
    example: 123,
  })
  doacaoID: number;

  @ApiProperty({
    description: 'Localização onde o rastreamento está sendo realizado',
    example: 'São Paulo, Brasil',
  })
  localizacao: string;

  @ApiProperty({
    description: 'Status atual do rastreamento',
    example: 'Em trânsito',
  })
  status: string;
}