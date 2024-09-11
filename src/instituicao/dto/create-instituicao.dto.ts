import { PickType } from '@nestjs/mapped-types';
import { InstituicaoEntity } from '../entities/instituicao.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstituicaoDto extends PickType(InstituicaoEntity, [
  'razaoSocial',
  'email',
  'senha',
  'fotoPerfil',
  'endereco',
]) {
  @ApiProperty({ 
    description: 'Razão social da instituição',
    example: 'Ajudar moradores de rua'
  })
  //Assertiva de entrada:
  // - deve ser uma string não vazia contendo a razão social da instituição
  razaoSocial: string;

  @ApiProperty({
    description: 'E-mail da Instituição',
    example: 'email_institucional@email.com'
  })
  //Assertiva de entrada:
  // - deve ser uma string não vazia contendo um e-mail válido
  email: string;

  @ApiProperty({
    description: 'Senha da Instituição',
    example: 'senha_institucional123'
  })
  //Assertiva de entrada
  // - deve ser uma string não vazia contendo a senha da instituição
  senha: string;

  @ApiProperty({
    description: 'Foto de perfil da Instituição',
    example: 'foto_institocional9383458.jpg'
  })
  //Assertiva de entrada:
  // - deve ser uma string não vazia contendo a foto de perfil da instituição em formato válido
  fotoPerfil: string;

  @ApiProperty({
    description: 'Endereço da Instituição'
    example: 'Rua institucional, avenida exemplar, bloco E '
  })
  //Assertiva de entrada:
  // - deve ser uma string não vazia contendo o endereço da instituição
  endereco: string;

}
