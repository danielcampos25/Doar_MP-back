import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  // let configService: ConfigService;

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
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test_secret'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    // configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token when credentials are valid', async () => {
      const loginRequestBody = {
        email: 'user@example.com',
        senha: 'password123',
      };
      const user = {
        id: 1,
        email: 'user@example.com',
        senha: 'hashed_password',
      };

      jest.spyOn(service, 'validateUser').mockResolvedValueOnce(user as any);
      jwtService.sign = jest.fn().mockReturnValue('jwt_token');

      const result = await service.login(loginRequestBody);
      expect(result).toEqual({ access_token: 'jwt_token' });
      expect(service.validateUser).toHaveBeenCalledWith(
        'user@example.com',
        'password123',
      );
      expect(jwtService.sign).toHaveBeenCalledWith(
        { email: 'user@example.com', sub: 1 },
        { expiresIn: '1d', secret: 'test_secret' },
      );
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const loginRequestBody = {
        email: 'user@example.com',
        senha: 'wrongpassword',
      };

      jest.spyOn(service, 'validateUser').mockResolvedValueOnce(null);

      await expect(service.login(loginRequestBody)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(service.validateUser).toHaveBeenCalledWith(
        'user@example.com',
        'wrongpassword',
      );
    });
  });

  describe('validateUser', () => {
    it('should return user without password when validation is successful', async () => {
      const user = {
        id: 1,
        email: 'user@example.com',
        senha: 'hashed_password',
      };
      userService.findByEmail = jest.fn().mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await service.validateUser(
        'user@example.com',
        'password123',
      );
      expect(result).toEqual({
        id: 1,
        email: 'user@example.com',
        senha: undefined,
      });
      expect(userService.findByEmail).toHaveBeenCalledWith('user@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashed_password',
      );
    });

    it('should return null when validation fails', async () => {
      userService.findByEmail = jest.fn().mockResolvedValue(null);

      const result = await service.validateUser(
        'user@example.com',
        'password123',
      );
      expect(result).toBeNull();
      expect(userService.findByEmail).toHaveBeenCalledWith('user@example.com');
    });

    it('should return null when password does not match', async () => {
      const user = {
        id: 1,
        email: 'user@example.com',
        senha: 'hashed_password',
      };
      userService.findByEmail = jest.fn().mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      const result = await service.validateUser(
        'user@example.com',
        'wrongpassword',
      );
      expect(result).toBeNull();
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongpassword',
        'hashed_password',
      );
    });
  });
});
