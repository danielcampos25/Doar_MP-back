import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userDto = {
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      };
      prisma.usuario.create = jest
        .fn()
        .mockResolvedValue({ id: 1, ...userDto });

      const result = await service.create(userDto);
      expect(result).toEqual({ id: 1, ...userDto });
      expect(prisma.usuario.create).toHaveBeenCalledWith({ data: userDto });
    });

    it('should throw an error if the email is already in use', async () => {
      const userDto = {
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      };
      prisma.usuario.create = jest.fn().mockRejectedValue({
        code: 'P2002',
        meta: {
          target: ['email'],
        },
      });

      await expect(service.create(userDto)).rejects.toThrow(
        'Email já está em uso.',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          nome: 'Manu',
          email: 'manu@aluno.unb.br',
          senha: 'M4nu@UnB',
          enderecoID: 1,
        },
      ];
      prisma.usuario.findMany = jest.fn().mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(prisma.usuario.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const user = {
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      };
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if user is not found', async () => {
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { nome: 'Emanuel' };
      prisma.usuario.update = jest.fn().mockResolvedValue({
        id: 1,
        nome: 'Emanuel',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      });

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual({
        id: 1,
        ...updateUserDto,
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      });
      expect(prisma.usuario.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
    });

    it('should throw an error if user is not found', async () => {
      const updateUserDto = { nome: 'Emanuel' };
      prisma.usuario.update = jest
        .fn()
        .mockRejectedValue(new NotFoundException('Usuário não encontrado.'));

      await expect(service.update(1, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      prisma.usuario.delete = jest.fn().mockResolvedValue({
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      });

      const result = await service.remove(1);
      expect(result).toEqual({
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      });
      expect(prisma.usuario.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if user is not found', async () => {
      prisma.usuario.delete = jest
        .fn()
        .mockRejectedValue(new NotFoundException('Usuário não encontrado.'));

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
