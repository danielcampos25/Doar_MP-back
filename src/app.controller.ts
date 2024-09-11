import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/isPublic.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Rota para retornar uma mensagem de Hello World
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Nova rota para retornar as contagens das tabelas e atualizar as estatísticas
  @Public()
  @Get('contagens')
  async obterContagens() {
    return this.appService.contarLinhasTabelas();
  }
}
