import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { PrismaService } from '../prisma/prisma.service';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  ],
  controllers: [MediasController],
  providers: [MediasService, PrismaService],
})
export class MediasModule {}
