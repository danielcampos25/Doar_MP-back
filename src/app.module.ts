import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DonationsModule } from './donations/donations.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { TrackingModule } from './tracking/tracking.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UsersModule,
    DonationsModule,
    InstituicaoModule,
    TrackingModule,
    AuthModule,
    JwtModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
