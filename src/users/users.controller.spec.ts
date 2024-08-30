import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
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
        enderecoID: 1,
      };
      const createdUser = { id: 1, ...createUserDto };

      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

      const result = await usersController.create(createUserDto);
      expect(result).toEqual(createdUser);
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
          senha: 'M4nu@UnB',
          enderecoID: 1,
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
        enderecoID: 1,
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

      const result = await usersController.findOne('1');
      expect(result).toEqual(user);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { nome: 'Emanuel' };
      const updatedUser = {
        id: 1,
        ...updateUserDto,
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      };

      jest.spyOn(usersService, 'update').mockResolvedValue(updatedUser);

      const result = await usersController.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(usersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = {
        id: 1,
        nome: 'Manu',
        email: 'manu@aluno.unb.br',
        senha: 'M4nu@UnB',
        enderecoID: 1,
      };

      jest.spyOn(usersService, 'remove').mockResolvedValue(result);

      await usersController.remove('1');
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });
  });
});
