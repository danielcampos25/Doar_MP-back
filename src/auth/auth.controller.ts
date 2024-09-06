import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { UserToken } from './types/UserToken';
import { Public } from './decorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginRequestBody: LoginRequestBody): Promise<UserToken> {
    return this.authService.login(loginRequestBody);
  }

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
