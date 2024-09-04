import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DonationsModule } from './donations/donations.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { MediasModule } from './medias/medias.module';

@Module({
  imports: [UsersModule, DonationsModule, InstituicaoModule, MediasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
