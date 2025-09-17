import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { EstablishmentResponseDto } from './dto/establishment-response.dto';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  create(@Body() createEstablishmentDto: CreateEstablishmentDto): Promise<EstablishmentResponseDto> {
    return this.establishmentService.create(createEstablishmentDto);
  }

  @Get()
  findAll(): Promise<EstablishmentResponseDto[]> {
    return this.establishmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EstablishmentResponseDto> {
    return this.establishmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentService.update(id, updateEstablishmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentService.remove(id);
  }
}
