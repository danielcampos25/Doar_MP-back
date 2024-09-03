import { Module } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InstituicaoController],
  providers: [InstituicaoService, PrismaService],
})
export class InstituicaoModule {}
