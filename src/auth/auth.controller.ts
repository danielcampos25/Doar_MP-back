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
  // Assertiva de Entrada:
  // - 'loginRequestBody': Um objeto contendo 'e-mail', 'senha' e 'tipo de usuario' deve ser fornecido.
  // - Os campos devem ser válidos e o e-mail deve estar no formato correto.
  // Assertiva de saída:
  // - O sistema deve retornar um token de usuário e o status 200, dizendo que o login foi realizado
  async login(@Body() loginRequestBody: LoginRequestBody): Promise<UserToken> {
    return this.authService.login(loginRequestBody);
  }

  @Get('me')
  @ApiOperation({summary: 'Retorna o perfil do usuario'})
  @ApiResponse({status: 200, description: 'Perfil retornado com sucesso'})
  @ApiResponse({status: 401, description: 'Perfil não encontrado'})
  //Assertiva de entrada:
  // - 'req': objeto contendo o usuário autenticado
  // Assertiva de saída:
  // - O sistema deve retornar os dados do usuário com o status 200
  getProfile(@Request() req) {
    return req.user;
  }
}
