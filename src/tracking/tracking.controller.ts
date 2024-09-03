import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @Get()
  async findAll() {
    return this.trackingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const tracking = await this.trackingService.findOne(id);
    if (!tracking) {
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }
    return tracking;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(id, updateTrackingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.trackingService.remove(id);
  }

  @Get('donation/:doacaoID')
  async findByDonationId(@Param('doacaoID') doacaoID: number) {
    return this.trackingService.findByDonationId(Number(doacaoID));
  }
}
