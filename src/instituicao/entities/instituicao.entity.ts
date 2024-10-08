import { Instituicao } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class InstituicaoEntity implements Instituicao {
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'A razão social não pode estar vazio.' })
  @IsString({ message: 'A razão social deve ser uma string.' })
  razaoSocial: string;

  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  @IsEmail({}, { message: 'Deve ser um endereço de email válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  senha: string;

  @IsOptional()
  @IsString({
    message: 'A foto de perfil deve ser armazenada como uma string.',
  })
  fotoPerfil: string;

  @IsNotEmpty({ message: 'O ID do endereço não pode estar vazio.' })
  @IsString({ message: 'O endereço deve ser uma string.' })
  endereco: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
