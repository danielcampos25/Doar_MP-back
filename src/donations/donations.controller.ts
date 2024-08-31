import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationEntity } from './entities/donation.entity';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  findAll(): Promise<DonationEntity[]> {
    return this.donationsService.findAll();
  }

  @Get(':id')
findOne(@Param('id') id: string): Promise<DonationEntity> {
  return this.donationsService.findOne(Number(id)); 
}

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDonationDto: UpdateDonationDto): Promise<DonationEntity> {
    return this.donationsService.update(Number(id), updateDonationDto);
  }

  @Patch(':id/entrega-concluida')
  entregaConcluida(@Param('id') id: number): Promise<DonationEntity> {
    return this.donationsService.entregaConcluida(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.donationsService.remove(Number(id));
  }
}