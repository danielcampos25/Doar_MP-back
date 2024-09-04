// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { LoginRequestBody } from './dto/loginRequestBody.dto';

// describe('AuthController', () => {
//   let controller: AuthController;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: {
//             login: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<AuthController>(AuthController);
//     authService = module.get<AuthService>(AuthService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('login', () => {
//     it('should return a JWT token', async () => {
//       const loginRequestBody: LoginRequestBody = {
//         email: 'user@example.com',
//         senha: 'password123',
//         userType: 'user',
//       };
//       const token = { access_token: 'jwt_token' };

//       jest.spyOn(authService, 'login').mockResolvedValueOnce(token);

//       const result = await controller.login(loginRequestBody);
//       expect(result).toEqual(token);
//       expect(authService.login).toHaveBeenCalledWith(loginRequestBody);
//     });
//   });

//   describe('getProfile', () => {
//     it('should return the user profile', () => {
//       const req = { user: { id: 1, email: 'user@example.com' } };

//       const result = controller.getProfile(req);
//       expect(result).toEqual(req.user);
//     });
//   });
// });
// export { AuthController };
