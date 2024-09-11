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

    // Supondo que a tabela doacao tem uma coluna "quantidadeItens"
    const totalItensDoacao = await this.prisma.doacao.aggregate({
      _sum: {
        quantidadeItens: true,
      },
    });

    // Contar doações entregues (supondo que exista uma coluna `entregue`)
    const doacoesEntregues = await this.prisma.doacao.count({
      where: {
        entregue: true, // Condição para doações que foram entregues
      },
    });

    // Calcular a porcentagem de doações entregues
    const porcentagemEntregues = totalDoacoes > 0 
      ? (doacoesEntregues / totalDoacoes) * 100 
      : 0; // Evitar divisão por zero

    // Persistir os dados na tabela Estatisticas
    await this.atualizarEstatisticas(totalDoacoes, doacoesEntregues, totalItensDoacao._sum.quantidadeItens || 0);

    return {
      totalUsuarios,
      totalInstituicoes,
      totalDoacoes,
      totalItensDoacao: totalItensDoacao._sum.quantidadeItens || 0, // Retorna 0 se não houver itens
      doacoesEntregues, // Adiciona a contagem de doações entregues
      porcentagemEntregues: porcentagemEntregues.toFixed(2) // Retorna a porcentagem com 2 casas decimais
    };
  }

  // Função para atualizar ou criar as estatísticas
  private async atualizarEstatisticas(totalCadastradas: number, totalEntregue: number, totalItens: number) {
    // Verificar se já existe um registro de estatísticas
    const estatisticasExistentes = await this.prisma.estatisticas.findFirst();

    if (estatisticasExistentes) {
      // Atualizar as estatísticas existentes
      await this.prisma.estatisticas.update({
        where: { id: estatisticasExistentes.id },
        data: {
          totalCadastradas,
          totalEntregue,
          totalItens,
        },
      });
    } else {
      // Criar novo registro de estatísticas
      await this.prisma.estatisticas.create({
        data: {
          totalCadastradas,
          totalEntregue,
          totalItens,
        },
      });
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
