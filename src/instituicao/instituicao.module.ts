import { Module } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [InstituicaoController],
  providers: [InstituicaoService, PrismaService, UsersService],
  exports: [InstituicaoService],
})
export class InstituicaoModule {}
