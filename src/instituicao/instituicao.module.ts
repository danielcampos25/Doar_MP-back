import { Module } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';

@Module({
  controllers: [InstituicaoController],
  providers: [InstituicaoService],
})
export class InstituicaoModule {}
