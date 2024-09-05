import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { DonationsService } from '../../donations/donations.service';

@Injectable()
export class DonationOwnershipGuard implements CanActivate {
  constructor(private readonly donationsService: DonationsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = Number(request.params.id);

    const donation = await this.donationsService.findOne(resourceId);
    if (donation.usuarioID !== user.sub) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso.',
      );
    }

    return true;
  }
}
