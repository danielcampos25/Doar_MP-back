import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class DoacaoEntity {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  doadorId: number;

  @ApiProperty()
  @IsInt()
  instituicaoId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  produto: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsDate()
  postadoEm: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDate()
  recebidoEm?: Date;
}
