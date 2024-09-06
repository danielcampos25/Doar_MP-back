import { Controller, Post, Get, UploadedFile, UseInterceptors, Body, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import * as multer from  'multer'
@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(), // Configurando para armazenar em memória
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto,
  ) {
    console.log('File received:', file); // Verifique se o arquivo é recebido corretamente
    console.log('DTO received:', createMediaDto); // Verifique o DTO

    createMediaDto.rastreamentoID = Number(createMediaDto.rastreamentoID); // Converte para número

    return this.mediasService.uploadFile(file, createMediaDto);
  }

  
}
