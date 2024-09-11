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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Instituições')
@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cria uma nova instituição'})
  @ApiResponse({ status: 201, description: 'Instituição criada com sucesso'})
  @ApiResponse({ status: 400, description: 'Dados invalidos'})
  @HttpCode(HttpStatus.CREATED)
  //Assertivas de entrada:
  // - 'createInstituicaoDto': objeto contendo 'razaoSocial', 'email', 'senha', 'fotoPerfil' e 'endereço'
  // - os itens a cima devem ser não vazios e válidos
  //Assertivas de saída:
  // - Retorna a instituição recém-criada com status 201
  // - em casa de dados inválidos responde com status 400
  async create(@Body() createInstituicaoDto: CreateInstituicaoDto) {
    return await this.instituicaoService.create(createInstituicaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as instituições cadastradas'})
  @ApiResponse({ status: 200, description: 'Lista de todas as instituições'})
  //Assertivas de saída:
  // - retorna uma lista com todas as instituições cadastradas, com status 200
  async findAll() {
    return await this.instituicaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna a instituição requisitada pelo id de instituição'})
  @ApiResponse({ status: 200, description: 'Instituição encontrada'})
  @ApiResponse({ status: 404, description: 'Instituição não encontrada'})
  //Assertivas de entrada:
  // - 'id': deve ser uma string não vazia que corresponda ao ID da instituição
  //Assertivas de saída:
  // - retorna a instituição correspondente ao ID fornecido, com status 200
  // - se a instituição não for encontrada retorna status 404
  async findOne(@Param('id') id: string) {
    return await this.instituicaoService.findOne(+id); // Converte para número
  }

  @Get('foto/:id')
  @ApiOperation({ summary: 'Retorna a foto da instituição requisitada'})
  @ApiResponse({ status: 200, description: 'Foto da instituição encontrada'})
  @ApiResponse({ status: 404, description: 'Foto da instituição não encontrada'})
  //Assertivas de entrada:
  // - 'id': deve ser um número não nulo que corresponda ao ID da instituição
  // - 'res' objeto que receberá e retornará a resposta ao usuário
  //Assertivas de saída:
  // - Retorna o objeto 'res' com a foto da instituição correspondente ao ID fornecido, com status 200
  // - se a foto não for encontrada, retorna status 404
  async getInstitutionPic(@Param('id') id: number, @Res() res: Response) {
    return this.instituicaoService.getInstitutionPic(+id, res);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma instituição'})
  @ApiResponse({ status: 200, description: 'Instituição atualizada com sucesso'})
  @ApiResponse({ status: 403, description: 'Usuário não autorizado'})
  //Assertivas de entrada: 
  // - 'id': deve ser uma string não vazia contendo o ID da instituição
  // - 'updateInstituicaoDto': objeto contendo dados válidos para a alteração
  //Assertivas de saída:
  // - Retorna a instituição atualizada, com status 200
  // - se o usuário não estiver autorizado, retorna status 403
  async update(
    @Param('id') id: string,
    @Body() updateInstituicaoDto: UpdateInstituicaoDto,
  ) {
    return await this.instituicaoService.update(+id, updateInstituicaoDto); // Converte para número
  }

  @UseGuards(OwnershipGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma instituição'})
  @ApiResponse({ status: 200, description: 'Instituição deletada com sucesso'})
  @ApiResponse({ status: 403, description: 'Usuário não autorizado'})
  @HttpCode(HttpStatus.NO_CONTENT)
  //Assertivas de entrada:
  // - 'id': deve ser uma string não vazia contendo o ID da instituição 
  //Assertiva de saída:
  // - retorna apenas status 200, sem nenhum dado
  // - se o usuário não estiver autorizado, retorna status 403
  async remove(@Param('id') id: string) {
    await this.instituicaoService.remove(+id); // Converte para número
  }

  @Post(':id/upload-photo')
  @ApiOperation({ summary: 'Salva a foto na memória antes de salvá-la no disco'})
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(), // Armazenar o arquivo na memória antes de salvá-lo no disco
    }),
  )
  @ApiOperation({ summary: 'Faz o upload da foto da instituição'})
  @ApiResponse({ status: 200, description: 'Foto institucional carregada com sucesso'})
  @ApiResponse({ status: 500, description: 'Erro ao carregar foto institucional'})
  //Assertivas de entrada:
  // - 'id': deve ser uma string não vazia que contenha o ID da instituição
  // - 'file': objeto que contenha um arquivo de imagem válido carregado via formulário
  // - 'res': objeto usado para retornar a foto ao usuário
  //Assertivas de saída:
  // - Retorna o objeto 'res', contando um JSON contendo a mensagem de sucesso e o caminho do arquivo, com status 200
  // - se houver erro no upload, retorna mensagem de erro com status 500
  async uploadInstitutionPic(
    @Param('id') id: string, // ID ainda como string
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const filePath = await this.instituicaoService.uploadInstitutionPic(
        file,
        +id,
      ); // Converte para número
      return res.json({
        message: 'Foto institucional carregada com sucesso',
        filePath,
      });
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
