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
  razaoSocial: string;

  @ApiProperty({
    description: 'E-mail da Instituição',
    example: 'email_institucional@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Senha da Instituição',
    example: 'senha_institucional123'
  })
  senha: string;

  @ApiProperty({
    description: ' Código da foto de perfil da Instituição',
    example: 'foto_institocional9383458.jpg'
  })
  fotoPerfil: string;

  @ApiProperty({
    description: 'Endereço da Instituição'
    example: 'Rua institucional, avenida exemplar, bloco E '
  })
  endereco: string;

}
