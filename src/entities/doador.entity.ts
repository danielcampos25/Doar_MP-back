import { ApiProperty } from '@nestjs/swagger';
import { Doador, Doacao } from '@prisma/client';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DoadorEntity implements Doador{
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty() // Use um tipo genérico aqui, já que `Doacao` é um tipo
  @IsOptional()
  doacoesEnviadas?: Doacao[]; // Use `string[]` ou o tipo apropriado
}
