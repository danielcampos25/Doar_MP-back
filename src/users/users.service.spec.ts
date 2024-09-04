import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

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
        fotoPerfil: 'profile.jpg',
        endereco: 'Rua A, 123',
      };
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(null);
      prisma.usuario.create = jest.fn().mockResolvedValue({
        id: 1,
        ...userDto,
        senha: expect.any(String),
      });

      const result = await service.create(userDto);
      expect(result).toEqual({
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        fotoPerfil: 'profile.jpg',
        endereco: 'Rua A, 123',
        senha: expect.any(String),
      });
      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: userDto.email },
      });
      expect(prisma.usuario.create).toHaveBeenCalledWith({
        data: {
          ...userDto,
          senha: expect.any(String),
        },
        select: expect.any(Object),
      });
    });

    it('should throw a ConflictException if email is already in use', async () => {
      const userDto = {
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        fotoPerfil: 'profile.jpg',
        endereco: 'Rua A, 123',
      };
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(userDto);

      await expect(service.create(userDto)).rejects.toThrow(
        new ConflictException('Este e-mail já está em uso.'),
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
          fotoPerfil: 'profile.jpg',
          endereco: 'Rua A, 123',
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
        fotoPerfil: 'profile.jpg',
        endereco: 'Rua A, 123',
      };
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if user is not found', async () => {
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado.'),
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        nome: 'Emanuel',
        email: 'emanuel@aluno.unb.br',
        senha: 'Emanuel@2024',
        fotoPerfil: 'newProfile.jpg',
        endereco: 'Rua B, 456',
      };
      const existingUser = {
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        endereco: 'Rua A, 123',
      };
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(existingUser);
      prisma.usuario.update = jest.fn().mockResolvedValue({
        id: 1,
        ...updateUserDto,
        senha: expect.any(String),
      });

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual({
        id: 1,
        ...updateUserDto,
      });
      expect(prisma.usuario.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...updateUserDto,
          senha: expect.any(String),
        },
        select: expect.any(Object),
      });
    });

    it('should throw a NotFoundException if user to update is not found', async () => {
      const updateUserDto = { nome: 'Emanuel' };
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.update(1, updateUserDto)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado.'),
      );
    });

    it('should throw a ConflictException if email is already in use by another user', async () => {
      const updateUserDto = { email: 'newEmail@unb.br' };
      const existingUser = {
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        endereco: 'Rua A, 123',
      };
      const otherUser = { id: 2, ...existingUser, email: 'newEmail@unb.br' };

      prisma.usuario.findUnique = jest
        .fn()
        .mockResolvedValueOnce(existingUser)
        .mockResolvedValueOnce(otherUser);

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new ConflictException(
            'Este e-mail já está em uso por outro usuário.',
          ),
        );

      await expect(service.update(1, updateUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const user = {
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        fotoPerfil: 'profile.jpg',
        endereco: 'Rua A, 123',
      };
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(user);
      prisma.usuario.delete = jest.fn().mockResolvedValue(user);

      const result = await service.remove(1);
      expect(result).toEqual(user);
      expect(prisma.usuario.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object),
      });
    });

    it('should throw a NotFoundException if user to delete is not found', async () => {
      prisma.usuario.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado.'),
      );
    });
  });
});
