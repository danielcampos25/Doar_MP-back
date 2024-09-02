import { Test, TestingModule } from '@nestjs/testing';
import { InstituicaoService } from './instituicao.service';

describe('InstituicaoService', () => {
  let service: InstituicaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstituicaoService],
    }).compile();

    service = module.get<InstituicaoService>(InstituicaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
