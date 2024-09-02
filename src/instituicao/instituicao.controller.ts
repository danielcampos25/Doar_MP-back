import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';

@Controller('instituicao')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Post()
  create(@Body() createInstituicaoDto: CreateInstituicaoDto) {
    return this.instituicaoService.create(createInstituicaoDto);
  }

  @Get()
  findAll() {
    return this.instituicaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituicaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstituicaoDto: UpdateInstituicaoDto) {
    return this.instituicaoService.update(+id, updateInstituicaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituicaoService.remove(+id);
  }
}
