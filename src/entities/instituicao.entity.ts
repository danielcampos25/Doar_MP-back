import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Doacao, Instituicao } from '@prisma/client';

export class InstituicaoEntity implements Instituicao{
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

  @ApiProperty() 
  @IsOptional()
  doacoesEnviadas?: Doacao[]; 
}
