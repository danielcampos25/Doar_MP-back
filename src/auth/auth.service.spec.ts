import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { InstituicaoService } from '../instituicao/instituicao.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: InstituicaoService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return a valid token for a valid user', async () => {
      const user = {
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'hashedPassword',
        fotoPerfil: 'profile-pic-url',
        endereco: 'address',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = 'jwt-token';

      jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValue({ ...user, role: 'user' });
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await authService.login({
        email: 'test@example.com',
        senha: 'password',
        userType: 'user',
      });

      expect(result).toEqual({ access_token: token });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'test@example.com',
          senha: 'wrongpassword',
          userType: 'user',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {
    it('should validate a user for correct credentials', async () => {
      const user = {
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'hashedPassword',
        fotoPerfil: 'profile-pic-url',
        endereco: 'address',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
        'user',
      );

      expect(result).toEqual({ ...user, senha: undefined, role: 'user' });
    });

    it('should return null for invalid password', async () => {
      const user = {
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'hashedPassword',
        fotoPerfil: 'profile-pic-url',
        endereco: 'address',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await authService.validateUser(
        'test@example.com',
        'wrongpassword',
        'user',
      );

      expect(result).toBeNull();
    });

    it('should return null for invalid email', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      const result = await authService.validateUser(
        'invalid@example.com',
        'password',
        'user',
      );

      expect(result).toBeNull();
    });

    it('should throw UnauthorizedException for invalid userType', async () => {
      await expect(
        authService.validateUser('test@example.com', 'password', 'invalidType'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
