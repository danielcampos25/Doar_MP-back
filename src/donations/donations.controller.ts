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
  //Assertivas de entrada:
  // - 'createDonationDto': objeto contendo 'descrição', 'qtdItens', 'QRcode', 'codigoRastreamento', 'entregue', 'usuarioID' e 'destinatarioID'
  // - todos acima devem ser válidos e não nulos.
  //Assertivas de saída:
  // - retorna a doação recém-criada com status 201
  // - em caso de dados inválidos lança exceção com status 400
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as doações'})
  @ApiResponse({ status: 200, description: 'Lista de todas as doações', type: [DonationEntity]})
  //Assertivas de saída:
  // - Retorna uma lista de doações do tipo DonationEntity[] com status 200
  findAll(): Promise<DonationEntity[]> {
    return this.donationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna a doação requisitada'})
  @ApiResponse({ status: 200, description: 'Doação encontrada', type: DonationEntity})
  @ApiResponse({ status: 404, description: 'Doação não encontrada'})
  //Assertivas de entrada:
  // - 'id': string com o número, válido, do id da doação
  //Assertivas de saída:
  // - retorna doação encontrada do tipo DonationEntity com status 200
  // - se a doação não for encontrada retorna status 404
  findOne(@Param('id') id: string): Promise<DonationEntity> {
    return this.donationsService.findOne(Number(id));
  }

  @UseGuards(DonationOwnershipGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma doação'})
  @ApiResponse({ status: 200, description: 'Doação atualizada com sucesso', type: DonationEntity})
  @ApiResponse({ status: 403, description: 'Usuário não autorizado'})
  //Assertivas de entrada:
  // - 'id' número não nulo contendo o id da doação
  // - 'updateDonationDto': objeto contendo dados válidos de doação para serem alterados
  //Assertivas de saída:
  // - retorna a doação atualizada do tipo DonationEntity com status 200
  // - se o usuário não estiver autorizado lança exceção com status 403
  update(
    @Param('id') id: number,
    @Body() updateDonationDto: UpdateDonationDto,
  ): Promise<DonationEntity> {
    return this.donationsService.update(Number(id), updateDonationDto);
  }

  @Patch(':id/entrega-concluida')
  @ApiOperation({ summary: 'Marca a entrega de uma doação como concluída'})
  @ApiResponse({ status: 200, description: 'Doação marcada como entregue', type: DonationEntity})
  //Assertivas de entrada:
  // - 'id': número não nulo que representa o id da doação
  //Assertivas de saída:
  // - retorna a doação do tipo DonationEntity com status de entrega concluída e status 200
  entregaConcluida(@Param('id') id: number): Promise<DonationEntity> {
    return this.donationsService.entregaConcluida(Number(id));
  }

  @UseGuards(DonationOwnershipGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma doação'})
  @ApiResponse({ status: 200, description: 'Doação removida com sucesso'})
  @ApiResponse({ status: 403, description: 'Usuário não autorizado'})
  //Assertivas de entrada:
  // - 'id' número não nulo que representa o id da doação
  //Assertiva de saída:
  // - Retorna apenas o status 200, sem nenhum dado
  // - Se o usuário não estiver autorizado lança exceção com status 403
  remove(@Param('id') id: number): Promise<void> {
    return this.donationsService.remove(Number(id));
  }
}
