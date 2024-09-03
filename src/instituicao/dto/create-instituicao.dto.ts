import { PickType } from '@nestjs/mapped-types';
import { InstituicaoEntity } from '../entities/instituicao.entity';

export class CreateInstituicaoDto extends PickType(InstituicaoEntity, [
  'razaoSocial',
  'email',
  'senha',
  'fotoPerfil',
  'endereco',
]) {}
