import { Rastreamento } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsDate,
} from 'class-validator';

export class TrackingEntity implements Rastreamento {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  doacaoID: number;

  @IsNotEmpty({ message: 'A localização não pode estar vazia.' })
  @IsString({ message: 'A localização deve ser uma string.' })
  localizacao: string;

  @IsNotEmpty({ message: 'O status não pode estar vazio.' })
  @IsString({ message: 'O status deve ser uma string.' })
  status: string;

  // Assumindo que `Midias[]` é um array de IDs ou objetos, ajuste conforme necessário
  //midias: any[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
