import { Test, TestingModule } from '@nestjs/testing';
import { MediasService } from './medias.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MediasService', () => {
  let service: MediasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediasService, PrismaService],
    }).compile();

    service = module.get<MediasService>(MediasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
