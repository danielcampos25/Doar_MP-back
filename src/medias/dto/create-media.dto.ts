import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({
    description: 'Tipo de mídia (ex: imagem, vídeo)',
    example: 'imagem'
  })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({
    description: 'ID de rastreamento relacionado à mídia',
    example: 12345
  })
  @IsNotEmpty()
  @Type(() => Number) // Garante que o rastreamentoID seja convertido em número
  @IsInt()
  rastreamentoID: number;
}