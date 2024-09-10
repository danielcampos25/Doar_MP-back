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
  nome: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senhaSegura123',
  })
  senha: string;

  @ApiProperty({
    description: 'URL da foto de perfil do usuário',
    example: 'https://example.com/foto.jpg',
  })
  fotoPerfil: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    example: 'Rua das Flores, 123, São Paulo, Brasil',
  })
  endereco: string;
}