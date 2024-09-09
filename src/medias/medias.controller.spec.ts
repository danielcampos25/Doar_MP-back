import { Test, TestingModule } from '@nestjs/testing';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MediasController', () => {
  let controller: MediasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediasController],
      providers: [MediasService, PrismaService],
    }).compile();

    controller = module.get<MediasController>(MediasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
