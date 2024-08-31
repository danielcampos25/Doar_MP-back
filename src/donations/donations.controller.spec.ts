import { Test, TestingModule } from '@nestjs/testing';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { DonationEntity } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

describe('DonationsController', () => {
  let controller: DonationsController;
  let service: DonationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationsController],
      providers: [
        {
          provide: DonationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DonationsController>(DonationsController);
    service = module.get<DonationsService>(DonationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a donation', async () => {
      const createDonationDto: CreateDonationDto = {
        usuarioID: 1,
        destinatarioID: 2,
        descricao: 'Roupa usada',
        qtdItens: 5,
        QRCode: 'qrcode123',
        codigoRastreamento: 'tracking123',
        entregue: false,
      };

      const createdDonation: DonationEntity = {
        id: 1,
        ...createDonationDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdDonation);

      expect(await controller.create(createDonationDto)).toBe(createdDonation);
    });
  });

  describe('findAll', () => {
    it('should return an array of donations', async () => {
      const donation: DonationEntity = {
        id: 1,
        usuarioID: 1,
        destinatarioID: 2,
        descricao: 'Roupa usada',
        qtdItens: 5,
        QRCode: 'qrcode123',
        codigoRastreamento: 'tracking123',
        entregue: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findAll').mockResolvedValue([donation]);

      expect(await controller.findAll()).toEqual([donation]);
    });
  });

  describe('findOne', () => {
    it('should return a single donation', async () => {
      const donation: DonationEntity = {
        id: 1,
        usuarioID: 1,
        destinatarioID: 2,
        descricao: 'Roupa usada',
        qtdItens: 5,
        QRCode: 'qrcode123',
        codigoRastreamento: 'tracking123',
        entregue: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(donation);

      expect(await controller.findOne('1')).toBe(donation);
    });
  });

  describe('update', () => {
    it('should update a donation', async () => {
      const updateDonationDto: UpdateDonationDto = {
        descricao: 'Roupa nova',
        qtdItens: 3,
        QRCode: 'qrcode456',
        codigoRastreamento: 'tracking456',
        entregue: true,
      };
  
      const existingDonation: DonationEntity = {
        id: 1,
        usuarioID: 1,
        destinatarioID: 2,
        descricao: 'Roupa usada',
        qtdItens: 5,
        QRCode: 'qrcode123',
        codigoRastreamento: 'tracking123',
        entregue: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const updatedDonation: DonationEntity = {
        ...existingDonation,
        ...updateDonationDto,
        updatedAt: new Date(), // Atualiza apenas as propriedades alteradas
      };
  
      jest.spyOn(service, 'update').mockResolvedValue(updatedDonation);
  
      expect(await controller.update(1, updateDonationDto)).toBe(updatedDonation);
    });
  });

      
  describe('remove', () => {
    it('should remove a donation', async () => {
      const result = { deleted: true };

      jest.spyOn(service, 'remove').mockResolvedValue(null);

      expect(await controller.remove(1)).toBe(result);
    });
  });
});
