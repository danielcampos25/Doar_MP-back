import { Test, TestingModule } from '@nestjs/testing';
import { InstituicaoService } from './instituicao.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('InstituicaoService', () => {
  let service: InstituicaoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstituicaoService, PrismaService],
    }).compile();

    service = module.get<InstituicaoService>(InstituicaoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new institution', async () => {
      const instituicaoDto = {
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        senha: 'amorILoveYou',
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
        fotoPerfil: null,
      };
      prisma.instituicao.findUnique = jest.fn().mockResolvedValue(null);
      prisma.instituicao.create = jest.fn().mockResolvedValue({
        id: 1,
        ...instituicaoDto,
        senha: expect.any(String),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(instituicaoDto);
      expect(result).toEqual({
        id: 1,
        ...instituicaoDto,
        senha: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(prisma.instituicao.findUnique).toHaveBeenCalledWith({
        where: { email: instituicaoDto.email },
      });
      expect(prisma.instituicao.create).toHaveBeenCalledWith({
        data: {
          ...instituicaoDto,
          senha: expect.any(String),
        },
        select: expect.any(Object),
      });
    });

    it('should throw a ConflictException if email is already in use', async () => {
      const instituicaoDto = {
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        senha: 'amorILoveYou',
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
        fotoPerfil: null,
      };
      prisma.instituicao.findUnique = jest
        .fn()
        .mockResolvedValue(instituicaoDto);

      await expect(service.create(instituicaoDto)).rejects.toThrow(
        new ConflictException('Este e-mail já está em uso.'),
      );
    });
  });

  describe('findOne', () => {
    it('should return a single institution by ID', async () => {
      const instituicao = {
        id: 1,
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
        fotoPerfil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.instituicao.findUnique = jest.fn().mockResolvedValue(instituicao);

      const result = await service.findOne(1);
      expect(result).toEqual(instituicao);
      expect(prisma.instituicao.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if institution is not found', async () => {
      prisma.instituicao.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Instituição não encontrada.'),
      );
    });
  });

  describe('update', () => {
    it('should update an institution', async () => {
      const updateInstituicaoDto = {
        razaoSocial: 'Instituição Amor Renovado',
        email: 'amor@renovado.com',
        senha: 'newPassword123',
        endereco: 'Nova Rua, 123',
        fotoPerfil: 'newProfile.jpg',
      };
      const existingInstituicao = {
        id: 1,
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        senha: 'amorILoveYou',
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
        fotoPerfil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.instituicao.findUnique = jest
        .fn()
        .mockResolvedValue(existingInstituicao);
      prisma.instituicao.update = jest.fn().mockResolvedValue({
        id: 1,
        ...updateInstituicaoDto,
        senha: expect.any(String),
        createdAt: existingInstituicao.createdAt,
        updatedAt: new Date(),
      });

      const result = await service.update(1, updateInstituicaoDto);
      expect(result).toEqual({
        id: 1,
        ...updateInstituicaoDto,
        createdAt: existingInstituicao.createdAt,
        updatedAt: expect.any(Date),
      });
      expect(prisma.instituicao.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...updateInstituicaoDto,
          senha: expect.any(String),
        },
        select: expect.any(Object),
      });
    });

    it('should throw a NotFoundException if institution to update is not found', async () => {
      const updateInstituicaoDto = { razaoSocial: 'Instituição Amor Renovado' };
      prisma.instituicao.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.update(1, updateInstituicaoDto)).rejects.toThrow(
        new NotFoundException('Instituição não encontrada.'),
      );
    });

    it('should throw a ConflictException if email is already in use by another institution', async () => {
      const updateInstituicaoDto = { email: 'novoemail@instituicao.com' };
      const existingInstituicao = {
        id: 1,
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        senha: 'amorILoveYou',
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
        fotoPerfil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const otherInstituicao = {
        id: 2,
        ...existingInstituicao,
        email: 'novoemail@instituicao.com',
      };

      prisma.instituicao.findUnique = jest
        .fn()
        .mockResolvedValueOnce(existingInstituicao)
        .mockResolvedValueOnce(otherInstituicao);

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new ConflictException(
            'Este e-mail já está em uso por outra instituição.',
          ),
        );

      await expect(service.update(1, updateInstituicaoDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('should delete an institution', async () => {
      const instituicao = {
        id: 1,
        razaoSocial: 'Instituição Contém Amor',
        email: 'contato@contemamor.com.br',
        endereco:
          'R. Artur Araripe, 63 - Sala 101 - Gávea, Rio de Janeiro - RJ, 22451-020',
        fotoPerfil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.instituicao.findUnique = jest.fn().mockResolvedValue(instituicao);
      prisma.instituicao.delete = jest.fn().mockResolvedValue(instituicao);

      const result = await service.remove(1);
      expect(result).toEqual(instituicao);
      expect(prisma.instituicao.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object),
      });
    });

    it('should throw a NotFoundException if institution to delete is not found', async () => {
      prisma.instituicao.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Instituição não encontrada.'),
      );
    });
  });
});
