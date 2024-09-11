import { Test, TestingModule } from '@nestjs/testing';
import { InstituicaoController } from './instituicao.controller';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { Instituicao } from '@prisma/client';
import { OwnershipGuard } from '../auth/guards/ownershipGuard.guard';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('InstituicaoController', () => {
  let controller: InstituicaoController;
  let service: InstituicaoService;

  const mockInstituicao: Instituicao = {
    id: 1,
    razaoSocial: 'Instituição Contém Amor',
    email: 'contato@contemamor.com.br',
    senha: 'amorILoveYou',
    fotoPerfil: null,
    endereco:
      'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstituicaoController],
      providers: [
        PrismaService,
        OwnershipGuard,
        UsersService,
        {
          provide: InstituicaoService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockInstituicao),
            findAll: jest.fn().mockResolvedValue([mockInstituicao]),
            findOne: jest.fn().mockResolvedValue(mockInstituicao),
            update: jest.fn().mockResolvedValue(mockInstituicao),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<InstituicaoController>(InstituicaoController);
    service = module.get<InstituicaoService>(InstituicaoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an institution', async () => {
      const dto: CreateInstituicaoDto = {
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        senha: 'amorILoveYou',
        fotoPerfil: 'foto.png',
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
      };
      const fotoPerfil = {} as Express.Multer.File;
      const result = await controller.create(dto, fotoPerfil); // Passando o segundo argumento
      expect(result).toEqual(mockInstituicao);
      expect(service.create).toHaveBeenCalledWith(dto, fotoPerfil);
    });
  });

  describe('findAll', () => {
    it('should return an array of institutions', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockInstituicao]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single institution', async () => {
      const result = await controller.findOne(1); // Corrigido para passar um número
      expect(result).toEqual(mockInstituicao);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an institution', async () => {
      const dto: UpdateInstituicaoDto = { razaoSocial: 'Contém Amor' };
      const result = await controller.update('1', dto);
      expect(result).toEqual(mockInstituicao);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove an institution', async () => {
      await controller.remove('1'); // Corrigido para não esperar retorno
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
