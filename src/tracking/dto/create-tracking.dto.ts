import { PickType } from '@nestjs/mapped-types';
import { TrackingEntity } from '../entities/tracking.entity';

export class CreateTrackingDto extends PickType(TrackingEntity, [
  'doacaoID',
  'localizacao',
  'status',   
  //'midias'//?,
]) {}
