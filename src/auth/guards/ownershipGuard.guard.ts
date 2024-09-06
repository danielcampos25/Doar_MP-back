import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { InstituicaoService } from '../../instituicao/instituicao.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly instituicaoService: InstituicaoService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = Number(request.params.id);
    const url = request.url;

    if (url.includes('/users')) {
      if (user.role !== 'user') {
        throw new ForbiddenException(
          'Somente usuários podem acessar perfis de usuários.',
        );
      }
      const foundUser = await this.usersService.findOne(resourceId);
      if (!foundUser || foundUser.id !== user.sub) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar esse recurso.',
        );
      }
    } else if (url.includes('/instituicoes')) {
      if (user.role !== 'instituicao') {
        throw new ForbiddenException(
          'Somente instituições podem acessar perfis de instituições.',
        );
      }
      const foundInstituicao =
        await this.instituicaoService.findOne(resourceId);
      if (!foundInstituicao || foundInstituicao.id !== user.sub) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar esse recurso.',
        );
      }
    } else {
      throw new ForbiddenException('Rota não reconhecida para autorização.');
    }

    return true;
  }
}
