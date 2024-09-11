app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // Assertiva de Entrada:
    // - Nenhum parâmetro de entrada é necessário para esta função.

    // Assertiva de Saída:
    // - Retorna uma string com a mensagem 'Hello World!'.
    return 'Hello World!';
  }
}