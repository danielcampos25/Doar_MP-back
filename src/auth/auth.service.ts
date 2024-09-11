import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InstituicaoService } from '../instituicao/instituicao.service';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './types/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserToken } from './types/UserToken';
import { LoginRequestBody } from './dto/loginRequestBody.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly instituicaoService: InstituicaoService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Assertivas de entrada:
  // - 'loginRequestBody': objeto contendo 'e-mail', 'senha' e 'tipo de usuário'
  // - as informações precisam ser válidas.
  // Assertivas de saída:
  // - retorna um objeto do tipo UserToken contendo as informações do usuário.
  // - Se alguma informação for inválida, o sistema laça exceção
  async login(loginRequestBody: LoginRequestBody): Promise<UserToken> {
    const isUserValid = await this.validateUser(
      loginRequestBody.email,
      loginRequestBody.senha,
      loginRequestBody.userType,
    );

    if (!isUserValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos.');
    }

    const payload: UserPayload = {
      sub: isUserValid.id,
      email: isUserValid.email,
      role: isUserValid.role,
    };

    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    const jwtToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: jwtSecret,
    });

    return {
      access_token: jwtToken,
    };
  }

  //Assertivas de Entrada:
  // - 'email': string contendo um e-mail válido e existente no banco de dados
  // - 'senha': string contendo uma senha correspondendo ao e-mail fornecido
  // - 'userType': string deve ser igual a 'user' ou 'instituicao'
  //Assertivas de Saída:
  // - se 'email', 'senha' e 'userType' forem válidos retorna um objeto contendo as informações do usuário exceto a senha e o tipo de usuário
  // - se 'email' ou 'senha' forem inválidos retorna 'null'
  // - se 'userType' for inválido lança exceção
  async validateUser(email: string, senha: string, userType: string) {
    if (userType !== 'user' && userType !== 'instituicao') {
      throw new UnauthorizedException('Tipo de usuário inválido.');
    }

    const user =
      userType === 'user'
        ? await this.userService.findByEmail(email)
        : await this.instituicaoService.findByEmail(email);

    if (user && (await bcrypt.compare(senha, user.senha))) {
      return {
        ...user,
        senha: undefined,
        role: userType,
      };
    }

    return null;
  }
}
