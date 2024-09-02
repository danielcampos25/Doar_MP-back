import { Injectable } from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';

@Injectable()
export class InstituicaoService {
  create(createInstituicaoDto: CreateInstituicaoDto) {
    return 'This action adds a new instituicao';
  }

  findAll() {
    return `This action returns all instituicao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instituicao`;
  }

  update(id: number, updateInstituicaoDto: UpdateInstituicaoDto) {
    return `This action updates a #${id} instituicao`;
  }

  remove(id: number) {
    return `This action removes a #${id} instituicao`;
  }
}
