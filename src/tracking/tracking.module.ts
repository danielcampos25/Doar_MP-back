import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [TrackingController],
  providers: [TrackingService,PrismaService],
})
export class TrackingModule {}
