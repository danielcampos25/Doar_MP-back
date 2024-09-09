import { Test, TestingModule } from '@nestjs/testing';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { NotFoundException } from '@nestjs/common';

describe('TrackingController', () => {
  let controller: TrackingController;
  let service: TrackingService;

  const mockTrackingService = {
    create: jest.fn((dto: CreateTrackingDto) => {
      return { id: 1, ...dto };
    }),
    findAll: jest.fn(() => {
      return [{ id: 1, localizacao: 'Location A', status: 'In Progress' }];
    }),
    findOne: jest.fn((id: number) => {
      if (id === 1) {
        return { id, localizacao: 'Location A', status: 'In Progress' };
      }
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }),
    update: jest.fn((id: number, dto: UpdateTrackingDto) => {
      return { id, ...dto };
    }),
    remove: jest.fn((id: number) => {
      if (id === 1) {
        return { id };
      }
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }),
    findByDonationId: jest.fn((doacaoID: number) => {
      if (doacaoID === 1) {
        return [{ id: 1, localizacao: 'Location A', status: 'In Progress' }];
      }
      throw new NotFoundException(
        `No tracking found for donation ID ${doacaoID}`,
      );
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [
        {
          provide: TrackingService,
          useValue: mockTrackingService,
        },
      ],
    }).compile();

    controller = module.get<TrackingController>(TrackingController);
    service = module.get<TrackingService>(TrackingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a tracking', async () => {
      const createTrackingDto: CreateTrackingDto = {
        localizacao: 'Location A',
        status: 'In Progress',
        doacaoID: 1,
      };

      expect(await controller.create(createTrackingDto)).toEqual({
        id: 1,
        ...createTrackingDto,
      });
      expect(service.create).toHaveBeenCalledWith(createTrackingDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of trackings', async () => {
      expect(await controller.findAll()).toEqual([
        { id: 1, localizacao: 'Location A', status: 'In Progress' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a tracking by id', async () => {
      expect(await controller.findOne(1)).toEqual({
        id: 1,
        localizacao: 'Location A',
        status: 'In Progress',
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if tracking not found', async () => {
      await expect(controller.findOne(2)).rejects.toThrowError(
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

      expect(await controller.update(1, updateTrackingDto)).toEqual({
        id: 1,
        ...updateTrackingDto,
      });
      expect(service.update).toHaveBeenCalledWith(1, updateTrackingDto);
    });
  });

  describe('remove', () => {
    it('should remove a tracking', async () => {
      expect(await controller.remove(1)).toEqual({ id: 1 });
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an error if tracking not found', async () => {
      await expect(controller.remove(2)).rejects.toThrowError(
        'Tracking with ID 2 not found',
      );
    });
  });

  describe('findByDonationId', () => {
    it('should return trackings by donation id', async () => {
      expect(await controller.findByDonationId(1)).toEqual([
        { id: 1, localizacao: 'Location A', status: 'In Progress' },
      ]);
      expect(service.findByDonationId).toHaveBeenCalledWith(1);
    });

    it('should throw an error if no trackings found for donation id', async () => {
      await expect(controller.findByDonationId(2)).rejects.toThrowError(
        'No tracking found for donation ID 2',
      );
    });
  });
});
