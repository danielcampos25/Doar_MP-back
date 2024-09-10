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
import { ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

@ApiTags('Autenticar')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({summary: 'Realizar o login do usuário, se esse possuir conta'})
  @ApiResponse({status: 200, description: 'Login realizado com sucesso', type: UserToken})
  @ApiResponse({status: 400, description: 'Dados de login não encontrados'})
  async login(@Body() loginRequestBody: LoginRequestBody): Promise<UserToken> {
    return this.authService.login(loginRequestBody);
  }

  @Get('me')
  @ApiOperation({summary: 'Retorna o perfil do usuario'})
  @ApiResponse({status: 200, description: 'Perfil retornado com sucesso'})
  @ApiResponse({status: 401, description: 'Perfil não encontrado'})
  getProfile(@Request() req) {
    return req.user;
  }
}
