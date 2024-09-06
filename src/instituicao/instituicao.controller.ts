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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { OwnershipGuard } from '../auth/guards/ownershipGuard.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Response } from 'express';

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
    return await this.instituicaoService.findOne(+id); // Converte para número
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstituicaoDto: UpdateInstituicaoDto,
  ) {
    return await this.instituicaoService.update(+id, updateInstituicaoDto); // Converte para número
  }

  @UseGuards(OwnershipGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.instituicaoService.remove(+id); // Converte para número
  }

  @Post(':id/upload-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(), // Armazenar o arquivo na memória antes de salvá-lo no disco
  }))
  async uploadInstitutionPic(
    @Param('id') id: string, // ID ainda como string
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    try {
      const filePath = await this.instituicaoService.uploadInstitutionPic(file, +id); // Converte para número
      return res.json({ message: 'Foto institucional carregada com sucesso', filePath });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
