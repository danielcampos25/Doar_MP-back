import { Test, TestingModule } from '@nestjs/testing';
import { InstituicaoController } from './instituicao.controller';
import { InstituicaoService } from './instituicao.service';

describe('InstituicaoController', () => {
  let controller: InstituicaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstituicaoController],
      providers: [InstituicaoService],
    }).compile();

    controller = module.get<InstituicaoController>(InstituicaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
