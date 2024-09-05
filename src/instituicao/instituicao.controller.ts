import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownershipGuard.guard';

@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInstituicaoDto: CreateInstituicaoDto) {
    return await this.instituicaoService.create(createInstituicaoDto);
  }

  @Get()
  async findAll() {
    return await this.instituicaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.instituicaoService.findOne(+id);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstituicaoDto: UpdateInstituicaoDto,
  ) {
    return await this.instituicaoService.update(+id, updateInstituicaoDto);
  }

  @UseGuards(OwnershipGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.instituicaoService.remove(+id);
  }
}
