import { Test, TestingModule } from '@nestjs/testing';
import { DonationsService } from './donations.service';
// import { DonationEntity } from './entities/donation.entity';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

describe('DonationsService', () => {
  let service: DonationsService;

  const mockDonation = {
    id: 1,
    usuarioID: 1,
    destinatarioID: 2,
    descricao: 'Descrição da doação',
    qtdItens: 10,
    QRCode: 'QRCodeString',
    codigoRastreamento: '12345',
    entregue: false,
  };

  const mockUser = {
    id: 1,
    nome: 'Usuário de Teste',
    email: 'userteste@unb.br',
  };

  const mockPrismaService = {
    doacao: {
      create: jest.fn().mockResolvedValue(mockDonation),
      findUnique: jest.fn(),
      findMany: jest.fn().mockResolvedValue([mockDonation]),
      update: jest.fn().mockResolvedValue(mockDonation),
      delete: jest.fn().mockResolvedValue(mockDonation),
    },
    usuario: {
      findUnique: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DonationsService>(DonationsService);
  });

  describe('create', () => {
    it('should create a donation', async () => {
      const result = await service.create({
        usuarioID: 1,
        destinatarioID: 2,
        descricao: 'Descrição da doação',
        QRCode: 'QRCodeString',
        qtdItens: 10,
        codigoRastreamento: '12345',
        entregue: false,
        titulo: 'titulo',
      });

      expect(result).toEqual(mockDonation);
      expect(mockPrismaService.doacao.create).toHaveBeenCalledWith({
        data: {
          usuarioID: 1,
          destinatarioID: 2,
          descricao: 'Descrição da doação',
          qtdItens: 10,
          QRCode: '',
          codigoRastreamento: '12345',
          entregue: false,
          titulo: 'titulo',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all donations', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockDonation]);
      expect(mockPrismaService.doacao.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a donation', async () => {
      mockPrismaService.doacao.findUnique.mockResolvedValueOnce(mockDonation);
      const result = await service.findOne(1);
      expect(result).toEqual(mockDonation);
      expect(mockPrismaService.doacao.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if donation not found', async () => {
      mockPrismaService.doacao.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.doacao.findUnique).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });

  describe('update', () => {
    it('should update a donation', async () => {
      const updatedDonationData = { descricao: 'Nova descrição' };
      const result = await service.update(1, updatedDonationData);

      expect(result).toEqual(mockDonation);
      expect(mockPrismaService.doacao.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedDonationData,
      });
    });

    it('should throw NotFoundException if donation not found', async () => {
      mockPrismaService.doacao.update.mockRejectedValueOnce(
        new NotFoundException('Doação não encontrada.'),
      );
      await expect(
        service.update(2, { descricao: 'Nova descrição' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a donation', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(undefined);
      expect(mockPrismaService.doacao.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if donation not found', async () => {
      mockPrismaService.doacao.delete.mockRejectedValueOnce(
        new NotFoundException('Doação não encontrada.'),
      );
      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('entregaConcluida', () => {
    it('should mark a donation as delivered', async () => {
      mockPrismaService.doacao.findUnique.mockResolvedValueOnce(mockDonation);
      mockPrismaService.usuario.findUnique.mockResolvedValueOnce(mockUser);

      const result = await service.entregaConcluida(1);
      expect(result).toEqual(mockDonation);
      expect(mockPrismaService.doacao.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { entregue: true },
      });
    });

    it('should throw NotFoundException if donation not found', async () => {
      mockPrismaService.doacao.findUnique.mockResolvedValueOnce(null);
      await expect(service.entregaConcluida(2)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
