import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBody {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'usuario@example.com',
  })
  // Assertiva de Entrada:
  // - Deve ser uma string não vazia e ser um endereço de e-mail válido.
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  // Assertiva de Entrada:
  // - Deve ser uma string não vazia contendo a senha do usuário.
  @IsNotEmpty()
  @IsString()
  senha: string;

  @ApiProperty({
    description: 'Tipo de usuário, por exemplo, "admin" ou "regular"',
    example: 'admin',
  })
  // Assertiva de Entrada:
  // - Deve ser uma string não vazia contendo o tipo de usuário.
  @IsNotEmpty()
  @IsString()
  userType: string;
}
