import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import * as multer from 'multer';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('medias')
@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()

  @ApiOperation({ summary: 'Faz o upload de um arquivo de mídia' }) 
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    description: 'Dados da mídia e arquivo a ser enviado',
    required: true,
    type: CreateMediaDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Arquivo enviado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou erro no envio do arquivo',
  })

  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(), // Configurando para armazenar em memória
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto,
  ) {
    console.log('File received:', file); // Verifique se o arquivo é recebido corretamente
    console.log('DTO received:', createMediaDto); // Verifique o DTO

    createMediaDto.rastreamentoID = Number(createMediaDto.rastreamentoID); // Converte para número

    return this.mediasService.uploadFile(file, createMediaDto);
  }
  @Get(':id')

  @ApiOperation({ summary: 'Busca uma mídia pelo ID' }) // Descreve a operação
  @ApiParam({
    name: 'id',
    description: 'ID da mídia a ser buscada',
    type: Number,
  })
@ApiResponse({
    status: 200,
    description: 'Mídia encontrada e retornada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Mídia não encontrada',
  })

  async getMedia(@Param('id') mediaId: number, @Res() res: Response) {
    return this.mediasService.getMedia(+mediaId, res);
  }
}