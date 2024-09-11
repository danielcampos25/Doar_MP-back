import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/isPublic.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Retrieve a hello message' })
  getHello(): string {
    // Assertiva de Entrada:
    // - Nenhum parâmetro de entrada é necessário para esta função.

    // Assertiva de Saída:
    // - Retorna uma string com uma mensagem de "hello".
    return this.appService.getHello();
  }
}