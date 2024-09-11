import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  // Função que retorna a contagem de linhas nas tabelas, incluindo doações entregues e a porcentagem
  async contarLinhasTabelas() {
    const totalUsuarios = await this.prisma.usuario.count();
    const totalInstituicoes = await this.prisma.instituicao.count();
    const totalDoacoes = await this.prisma.doacao.count();

    // Somar os itens de todas as doações
    const totalItensDoacao = await this.prisma.doacao.aggregate({
      _sum: {
        qtdItens: true,
      },
    });

    // Contar doações entregues
    const doacoesEntregues = await this.prisma.doacao.count({
      where: {
        entregue: true, // Condição para doações que foram entregues
      },
    });

    // Calcular a porcentagem de doações entregues
    const porcentagemEntregues =
      totalDoacoes > 0 ? (doacoesEntregues / totalDoacoes) * 100 : 0; // Evitar divisão por zero

    // Retornar o resultado das contagens
    return {
      totalUsuarios,
      totalInstituicoes,
      totalDoacoes,
      totalItensDoacao: totalItensDoacao._sum.qtdItens || 0, // Retorna 0 se não houver itens
      doacoesEntregues, // Adiciona a contagem de doações entregues
      porcentagemEntregues: porcentagemEntregues.toFixed(2), // Retorna a porcentagem com 2 casas decimais
    };
  }

  // Função exemplo de Hello World (mantida para verificar se o serviço está online)
  getHello(): string {
    return 'Hello World!';
  }
}
