import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('donation/:doacaoID') // Rota alterada para incluir doacaoID
  @UseInterceptors(FileInterceptor('fotoRastreamento')) // 'foto' é o nome do campo para o arquivo de imagem
  async create(
    @Param('doacaoID') doacaoID: number,
    @Body() createTrackingDto: CreateTrackingDto,
    @UploadedFile() file: Express.Multer.File, // Recebe o arquivo enviado
  ) {
    return this.trackingService.create(
      Number(doacaoID),
      createTrackingDto,
      file,
    );
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
  async update(
    @Param('id') id: number,
    @Body() updateTrackingDto: UpdateTrackingDto,
  ) {
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
