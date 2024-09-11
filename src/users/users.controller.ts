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
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { OwnershipGuard } from '../auth/guards/ownershipGuard.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('fotoPerfil'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() fotoPerfil: Express.Multer.File,
  ) {
    console.log('Arquivo recebido no controlador:', fotoPerfil); // Verifique se o arquivo chega aqui
    return this.usersService.create(createUserDto, fotoPerfil);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('foto/:id')
  async getUserPic(@Param('id') userId: number, @Res() res: Response) {
    return this.usersService.getUserPic(+userId, res);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(OwnershipGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id/upload-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserPic(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const filePath = await this.usersService.uploadUserPic(file, Number(id));
      return res.json({
        message: 'Foto de perfil carregada com sucesso',
        filePath,
      });
    } catch (error) {
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
