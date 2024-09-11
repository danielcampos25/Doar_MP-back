import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common'; 
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo rastreamento' })
  @ApiBody({
    description: 'Dados do rastreamento a serem criados',
    type: CreateTrackingDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Rastreamento criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou dados inválidos',
  })
  async create(@Body() createTrackingDto: CreateTrackingDto) {
    // Assertivas de Entrada:
    // - createTrackingDto: Deve ser um objeto válido contendo os campos `doacaoID`, `localizacao`, e `status` de acordo com o DTO.

    // Assertiva de Saída:
    // - Deve retornar o rastreamento criado com os dados válidos no banco de dados.

    return this.trackingService.create(createTrackingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtém todos os rastreamentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os rastreamentos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro no servidor ao obter rastreamentos',
  })
  async findAll() {
    // Assertivas de Entrada:
    // - Nenhuma entrada específica é necessária.

    // Assertiva de Saída:
    // - Deve retornar uma lista de todos os rastreamentos disponíveis no banco de dados.

    return this.trackingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um rastreamento pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do rastreamento a ser obtido',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Rastreamento encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Rastreamento não encontrado',
  })
  async findOne(@Param('id') id: number) {
    // Assertivas de Entrada:
    // - id: Deve ser um número inteiro válido representando o ID do rastreamento.

    const tracking = await this.trackingService.findOne(id);

    // Assertiva de Saída:
    // - Se encontrado, deve retornar os dados do rastreamento correspondente.
    // - Caso contrário, deve lançar uma exceção `NotFoundException` com uma mensagem apropriada.

    if (!tracking) {
      throw new NotFoundException(`Tracking with ID ${id} not found`);
    }
    return tracking;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um rastreamento existente' })
  @ApiParam({
    name: 'id',
    description: 'ID do rastreamento a ser atualizado',
    type: Number,
  })
  @ApiBody({
    description: 'Dados do rastreamento a serem atualizados',
    type: UpdateTrackingDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Rastreamento atualizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Rastreamento não encontrado',
  })
  async update(@Param('id') id: number, @Body() updateTrackingDto: UpdateTrackingDto) {
    // Assertivas de Entrada:
    // - id: Deve ser um número inteiro válido que representa o ID do rastreamento.
    // - updateTrackingDto: Deve conter campos válidos para serem atualizados.

    // Assertiva de Saída:
    // - Deve retornar o rastreamento atualizado ou lançar uma exceção caso o rastreamento não seja encontrado ou os dados sejam inválidos.

    return this.trackingService.update(id, updateTrackingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um rastreamento pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do rastreamento a ser removido',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Rastreamento removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Rastreamento não encontrado',
  })
  async remove(@Param('id') id: number) {
    // Assertivas de Entrada:
    // - id: Deve ser um número inteiro válido que representa o ID do rastreamento a ser removido.

    // Assertiva de Saída:
    // - Deve remover o rastreamento do banco de dados se encontrado e retornar uma confirmação.
    // - Se o rastreamento não for encontrado, deve lançar uma exceção `NotFoundException`.

    return this.trackingService.remove(id);
  }

  @Get('donation/:doacaoID')
  @ApiOperation({ summary: 'Obtém rastreamentos pelo ID da doação' })
  @ApiParam({
    name: 'doacaoID',
    description: 'ID da doação para buscar rastreamentos',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de rastreamentos associados à doação',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum rastreamento encontrado para o ID da doação fornecido',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro no servidor ao buscar rastreamentos',
  })
  async findByDonationId(@Param('doacaoID') doacaoID: number) {
    // Assertivas de Entrada:
    // - doacaoID: Deve ser um número inteiro válido representando o ID da doação.

    // Assertiva de Saída:
    // - Deve retornar uma lista de rastreamentos associados ao `doacaoID` fornecido.
    // - Se nenhum rastreamento for encontrado, deve lançar uma exceção `NotFoundException`.

    return this.trackingService.findByDonationId(Number(doacaoID));
  }
}