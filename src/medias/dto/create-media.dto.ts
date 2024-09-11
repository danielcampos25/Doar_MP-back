import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  // Entrada: A propriedade tipo deve ser uma string não vazia.
  // Saída esperada: A propriedade tipo será uma string que representa o tipo de mídia (ex: 'imagem', 'vídeo').

  @ApiProperty({
    description: 'Tipo de mídia (ex: imagem, vídeo)',
    example: 'imagem'
  })
  @IsNotEmpty()  // Assertiva de entrada: tipo não deve estar vazio.
  @IsString()    // Assertiva de entrada: tipo deve ser uma string.
  tipo: string;

  // Entrada: A propriedade rastreamentoID deve ser um número inteiro não vazio.
  // Saída esperada: A propriedade rastreamentoID será um número inteiro que representa o ID de rastreamento da mídia.

  @ApiProperty({
    description: 'ID de rastreamento relacionado à mídia',
    example: 12345
  })
  @IsNotEmpty()    // Assertiva de entrada: rastreamentoID não deve estar vazio.
  @Type(() => Number)  // Assertiva de transformação: Garante que rastreamentoID será convertido em número.
  @IsInt()        // Assertiva de entrada: rastreamentoID deve ser um número inteiro.
  rastreamentoID: number;
}