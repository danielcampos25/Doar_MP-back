import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a valid token on successful login', async () => {
      const token = { access_token: 'jwt-token' };
      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const loginRequestBody: LoginRequestBody = {
        email: 'test@example.com',
        senha: 'password',
        userType: 'user',
      };

      const result = await authController.login(loginRequestBody);

      expect(result).toEqual(token);
    });

    it('should throw UnauthorizedException on failed login', async () => {
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new UnauthorizedException());

      const loginRequestBody: LoginRequestBody = {
        email: 'invalid@example.com',
        senha: 'wrongpassword',
        userType: 'user',
      };

      await expect(authController.login(loginRequestBody)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', () => {
      const req = {
        user: {
          id: 1,
          email: 'test@example.com',
        },
      };

      const result = authController.getProfile(req);

      expect(result).toEqual(req.user);
    });
  });
});
