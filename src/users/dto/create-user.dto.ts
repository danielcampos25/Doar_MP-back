import { PickType } from '@nestjs/mapped-types'; 
import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends PickType(UserEntity, [
  'nome',
  'email',
  'senha',
  'fotoPerfil',
  'endereco',
]) {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  // Assertiva de Entrada:
  // - Deve ser uma string não vazia representando o nome do usuário.
  nome: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'joao.silva@example.com',
  })
  // Assertiva de Entrada:
  // - Deve ser um endereço de e-mail válido.
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senhaSegura123',
  })
  // Assertiva de Entrada:
  // - Deve ser uma string contendo a senha do usuário.
  senha: string;

  @ApiProperty({
    description: 'URL da foto de perfil do usuário',
    example: 'https://example.com/foto.jpg',
  })
  // Assertiva de Entrada:
  // - Deve ser uma string contendo uma URL válida para a foto de perfil do usuário.
  fotoPerfil: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    example: 'Rua das Flores, 123, São Paulo, Brasil',
  })
  // Assertiva de Entrada:
  // - Deve ser uma string contendo o endereço completo do usuário.
  endereco: string;
}