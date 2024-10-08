import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/isPublic.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Rota para retornar as contagens das tabelas
  @Public()
  @Get('contagens')
  async obterContagens() {
    return this.appService.contarLinhasTabelas();
  }
}
