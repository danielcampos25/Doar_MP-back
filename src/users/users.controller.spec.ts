import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OwnershipGuard } from '../auth/guards/ownershipGuard.guard';
import { InstituicaoService } from '../instituicao/instituicao.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        OwnershipGuard,
        InstituicaoService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        fotoPerfil: 'profile.jpg',
        endereco: 'Rua A, 123',
      };
      const createdUser = { id: 1, ...createUserDto };

      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

      const result = await usersController.create(createUserDto);
      expect(result).toEqual(createdUser);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw a ConflictException if the email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        fotoPerfil: 'profile.jpg',
        endereco: 'Rua A, 123',
      };

      jest
        .spyOn(usersService, 'create')
        .mockRejectedValue(
          new ConflictException('Este e-mail já está em uso.'),
        );

      await expect(usersController.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          nome: 'Manu',
          email: 'manu@aluno.unb.br',
          fotoPerfil: null,
          endereco: 'Rua A, 123',
        },
      ];

      jest.spyOn(usersService, 'findAll').mockResolvedValue(users);

      const result = await usersController.findAll();
      expect(result).toEqual(users);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const user = {
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        fotoPerfil: null,
        endereco: 'Rua A, 123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

      const result = await usersController.findOne('1');
      expect(result).toEqual(user);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      jest
        .spyOn(usersService, 'findOne')
        .mockRejectedValue(new NotFoundException('Usuário não encontrado.'));

      await expect(usersController.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { nome: 'Emanuel' };
      const updatedUser = {
        id: 1,
        nome: updateUserDto.nome,
        email: 'emanuel@aluno.unb.br',
        fotoPerfil: 'newProfile.jpg',
        endereco: 'Rua B, 456',
      };

      jest.spyOn(usersService, 'update').mockResolvedValue(updatedUser);

      const result = await usersController.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      const updateUserDto: UpdateUserDto = { nome: 'Emanuel' };

      jest
        .spyOn(usersService, 'update')
        .mockRejectedValue(new NotFoundException('Usuário não encontrado.'));

      await expect(usersController.update('1', updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should throw a ConflictException if the email is already in use by another user', async () => {
      const updateUserDto: UpdateUserDto = { email: 'outrousuario@unb.br' };

      jest
        .spyOn(usersService, 'update')
        .mockRejectedValue(
          new ConflictException(
            'Este e-mail já está em uso por outro usuário.',
          ),
        );

      await expect(usersController.update('1', updateUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = {
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        fotoPerfil: null,
        endereco: 'Rua A, 123',
      };

      jest.spyOn(usersService, 'remove').mockResolvedValue(user);

      const result = await usersController.remove('1');
      expect(result).toEqual(user);
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      jest
        .spyOn(usersService, 'remove')
        .mockRejectedValue(new NotFoundException('Usuário não encontrado.'));

      await expect(usersController.remove('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });
  });
});
