import { PartialType } from '@nestjs/swagger';
import { CreateInstituicaoDto } from './create-instituicao.dto';

export class UpdateInstituicaoDto extends PartialType(CreateInstituicaoDto) {}
