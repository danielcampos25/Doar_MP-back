import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @Type(() => Number) // Garante que o rastreamentoID seja convertido em número
  @IsInt()
  rastreamentoID: number;
}
