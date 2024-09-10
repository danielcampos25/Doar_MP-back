import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { OwnershipGuard } from '../auth/guards/ownershipGuard.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()

  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'João da Silva',
        email: 'joao.silva@example.com',
        senha: 'senhaSegura123',
        fotoPerfil: 'https://example.com/foto.jpg',
        endereco: 'Rua das Flores, 123, São Paulo, SP, Brasil',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })

  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()

  @ApiOperation({ summary: 'Obtém todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os usuários',
    schema: {
      example: [
        {
          id: 1,
          nome: 'João da Silva',
          email: 'joao.silva@example.com',
          senha: 'senhaSegura123',
          fotoPerfil: 'https://example.com/foto.jpg',
          endereco: 'Rua das Flores, 123, São Paulo, SP, Brasil',
        },
      ],
    },
  })

  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')

  @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'João da Silva',
        email: 'joao.silva@example.com',
        senha: 'senhaSegura123',
        fotoPerfil: 'https://example.com/foto.jpg',
        endereco: 'Rua das Flores, 123, São Paulo, SP, Brasil',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })

  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('foto/:id')

  @ApiOperation({ summary: 'Obtém a foto de perfil do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Foto de perfil do usuário',
  })
  @ApiResponse({
    status: 404,
    description: 'Foto de perfil não encontrada',
  })

  async getUserPic(@Param('id') userId: number, @Res() res: Response) {
    return this.usersService.getUserPic(+userId, res);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')

  @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'João da Silva',
        email: 'joao.silva@example.com',
        senha: 'novaSenhaSegura123',
        fotoPerfil: 'https://example.com/novaFoto.jpg',
        endereco: 'Rua das Flores, 123, São Paulo, SP, Brasil',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })

  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(OwnershipGuard)
  @Delete(':id')

  @ApiOperation({ summary: 'Remove um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })

  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id/upload-photo')
  @UseInterceptors(FileInterceptor('file'))
  
  @ApiOperation({ summary: 'Faz o upload da foto de perfil do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Foto de perfil carregada com sucesso',
    schema: {
      example: {
        message: 'Foto de perfil carregada com sucesso',
        filePath: '/uploads/usuario/1/foto.jpg',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao carregar foto de perfil',
  })

  async uploadUserPic(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    try {
      const filePath = await this.usersService.uploadUserPic(file, Number(id));
      return res.json({ message: 'Foto de perfil carregada com sucesso', filePath });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}