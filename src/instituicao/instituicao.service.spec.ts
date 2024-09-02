import { Test, TestingModule } from '@nestjs/testing';
import { InstituicaoService } from './instituicao.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Instituicao } from '@prisma/client';

describe('InstituicaoService', () => {
  let service: InstituicaoService;
  let prisma: PrismaService;

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

  const mockPrismaService = {
    instituicao: {
      create: jest.fn().mockResolvedValue(mockInstituicao),
      findUnique: jest.fn().mockResolvedValue(mockInstituicao),
      findMany: jest.fn().mockResolvedValue([mockInstituicao]),
      update: jest.fn().mockResolvedValue(mockInstituicao),
      delete: jest.fn().mockResolvedValue(mockInstituicao),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstituicaoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<InstituicaoService>(InstituicaoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create an institution', async () => {
      const dto = {
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        senha: 'amorILoveYou',
        fotoPerfil: null,
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
      };
      const result = await service.create(dto);
      expect(result).toEqual(mockInstituicao);
      expect(prisma.instituicao.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of institutions', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockInstituicao]);
      expect(prisma.instituicao.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single institution', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockInstituicao);
      expect(prisma.instituicao.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if institution not found', async () => {
      prisma.instituicao.findUnique = jest.fn().mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an institution', async () => {
      const dto = { razaoSocial: 'Contém Amor' };
      const result = await service.update(1, dto);
      expect(result).toEqual(mockInstituicao);
      expect(prisma.instituicao.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove an institution', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockInstituicao);
      expect(prisma.instituicao.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
