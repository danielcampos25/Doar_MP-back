import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationEntity } from './entities/donation.entity';
import { DonationOwnershipGuard } from '../auth/guards/donationOwnershipGuard.guard';
import { ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

@ApiTags('Doações')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova doação'})
  @ApiResponse({ status: 201, description: 'Doação criada com sucesso'})
  @ApiResponse({ status: 400, description: 'Dados inválidos'})
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as doações'})
  @ApiResponse({ status: 200, description: 'Lista de todas as doações', type: [DonationEntity]})
  findAll(): Promise<DonationEntity[]> {
    return this.donationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna a doação requisitada'})
  @ApiResponse({ status: 200, description: 'Doação encontrada', type: DonationEntity})
  @ApiResponse({ status: 404, description: 'Doação não encontrada'})
  findOne(@Param('id') id: string): Promise<DonationEntity> {
    return this.donationsService.findOne(Number(id));
  }

  @UseGuards(DonationOwnershipGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma doação'})
  @ApiResponse({ status: 200, description: 'Doação atualizada com sucesso', type: DonationEntity})
  @ApiResponse({ status: 403, description: 'Usuário não autorizado'})
  update(
    @Param('id') id: number,
    @Body() updateDonationDto: UpdateDonationDto,
  ): Promise<DonationEntity> {
    return this.donationsService.update(Number(id), updateDonationDto);
  }

  @Patch(':id/entrega-concluida')
  @ApiOperation({ summary: 'Marca a entrega de uma doação como concluída'})
  @ApiResponse({ status: 200, description: 'Doação marcada como entregue', type: DonationEntity})
  entregaConcluida(@Param('id') id: number): Promise<DonationEntity> {
    return this.donationsService.entregaConcluida(Number(id));
  }

  @UseGuards(DonationOwnershipGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma doação'})
  @ApiResponse({ status: 200, description: 'Doação removida com sucesso'})
  @ApiResponse({ status: 403, description: 'Usuário não autorizado'})
  remove(@Param('id') id: number): Promise<void> {
    return this.donationsService.remove(Number(id));
  }
}
