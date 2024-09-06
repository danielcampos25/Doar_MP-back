import { Doacao } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class DonationEntity implements Doacao {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  usuarioID: number;

  @IsNotEmpty()
  @IsInt()
  destinatarioID: number; 


  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;

  @IsNotEmpty({ message: 'A quantidade de itens não pode estar vazia.' })
  @IsInt({ message: 'A quantidade de itens deve ser um número.' })
  qtdItens: number;

  @IsNotEmpty()
  @IsString()
  QRCode: string;

  @IsNotEmpty({ message: 'O código de rastreamento não pode estar vazio.' })
  @IsString({ message: 'O código de rastreamento deve ser uma string.' })
  codigoRastreamento: string; // Removido o ? para torná-lo obrigatório

  @IsNotEmpty()
  @IsBoolean()
  entregue: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
