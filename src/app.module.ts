import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [UsersModule, DonationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
