import { Test, TestingModule } from '@nestjs/testing';
import { TrackingService } from './tracking.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

describe('TrackingService', () => {
  let service: TrackingService;
  let prisma: PrismaService;

  const mockTrackingData = {
    id: 1,
    doacaoID: 1,
    localizacao: 'Location A',
    status: 'In Progress',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDonationData = {
    id: 1,
    usuario: { id: 1, nome: 'User de Teste', email: 'test@example.com' },
  };

  const mockPrismaService = {
    rastreamento: {
      create: jest.fn((dto: CreateTrackingDto) => {
        return {
          id: mockTrackingData.id,
          ...dto,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      findMany: jest.fn((params = { where: { doacaoID: 1 } }) => {
        if (params.where.doacaoID === 1) {
          return [mockTrackingData];
        }
        return [];
      }),
      findUnique: jest.fn((params) => {
        if (params.where.id === 1) {
          return mockTrackingData;
        }
        return null;
      }),
      update: jest.fn((params) => {
        if (params.where.id === 1) {
          return { id: mockTrackingData.id, ...params.data };
        }
        throw new Error('Tracking not found');
      }),
      delete: jest.fn((params) => {
        if (params.where.id === 1) {
          return { id: mockTrackingData.id };
        }
        throw new Error('Tracking not found');
      }),
    },
    doacao: {
      findUnique: jest.fn().mockImplementation((params) => {
        if (params.where.id === 1) {
          return mockDonationData;
        }
        return null;
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TrackingService>(TrackingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a tracking', async () => {
      const doacaoID = 1;
      const createTrackingDto: CreateTrackingDto = {
        localizacao: 'Location A',
        status: 'In Progress',
        fotoRastreamento: 'test.png',
      };

      const result = await service.create(doacaoID, createTrackingDto);

      expect(result).toEqual({
        id: 1,
        data: {
          doacaoID: doacaoID,
          ...createTrackingDto,
        },
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(prisma.rastreamento.create).toHaveBeenCalledWith({
        data: {
          ...createTrackingDto,
          doacaoID,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of trackings', async () => {
      expect(await service.findAll()).toEqual([mockTrackingData]);
      expect(prisma.rastreamento.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a tracking by id', async () => {
      expect(await service.findOne(1)).toEqual(mockTrackingData);
      expect(prisma.rastreamento.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if tracking not found', async () => {
      await expect(service.findOne(2)).rejects.toThrowError(
        'Tracking with ID 2 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a tracking', async () => {
      const updateTrackingDto: UpdateTrackingDto = {
        localizacao: 'Updated Location',
        status: 'Completed',
      };

      expect(await service.update(1, updateTrackingDto)).toEqual({
        id: 1,
        ...updateTrackingDto,
      });
      expect(prisma.rastreamento.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateTrackingDto,
      });
    });

    it('should throw an error if tracking not found during update', async () => {
      await expect(service.update(2, {})).rejects.toThrowError(
        'Tracking with ID 2 not found',
      );
    });
  });

  describe('remove', () => {
    it('should remove a tracking', async () => {
      expect(await service.remove(1)).toEqual({ id: 1 });
      expect(prisma.rastreamento.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if tracking not found during remove', async () => {
      await expect(service.remove(2)).rejects.toThrowError(
        'Tracking with ID 2 not found',
      );
    });
  });

  describe('findByDonationId', () => {
    it('should return trackings by donation id', async () => {
      expect(await service.findByDonationId(1)).toEqual([mockTrackingData]);
      expect(prisma.rastreamento.findMany).toHaveBeenCalledWith({
        where: { doacaoID: 1 },
      });
    });

    it('should throw an error if no trackings found for donation id', async () => {
      prisma.rastreamento.findMany = jest.fn().mockReturnValueOnce([]);

      await expect(service.findByDonationId(2)).rejects.toThrowError(
        'No tracking found for donation ID 2',
      );
    });
  });
});
