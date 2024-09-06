import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { InstituicaoService } from 'src/instituicao/instituicao.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, InstituicaoService],
  exports: [UsersService],
})
export class UsersModule {}
