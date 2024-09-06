import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DonationsModule } from './donations/donations.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { MediasModule } from './medias/medias.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [UsersModule, DonationsModule, InstituicaoModule, MediasModule, TrackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
