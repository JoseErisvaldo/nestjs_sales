import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { EstablishmentResponseDto } from './dto/establishment-response.dto';
import { plainToInstance } from 'class-transformer';
import { EstablishmentRepository } from './establishment.repository';

@Injectable()
export class EstablishmentService {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
  ) {}
  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<EstablishmentResponseDto> {
    const establishment = this.establishmentRepository.create(
      createEstablishmentDto,
    );
    const saved = await this.establishmentRepository.save(establishment);
    return plainToInstance(EstablishmentResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<EstablishmentResponseDto[]> {
    const establishment = await this.establishmentRepository.findAll();
    if (!establishment || establishment.length === 0) {
      throw new NotFoundException('no establishments found');
    }

    return plainToInstance(EstablishmentResponseDto, establishment, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<EstablishmentResponseDto> {
    const result = await this.establishmentRepository.findOneById(id);
    if (!result) {
      throw new NotFoundException(`Establishment with id ${id} not found`);
    }
    return plainToInstance(EstablishmentResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateEstablishmentDto: UpdateEstablishmentDto) {
    const result = await this.establishmentRepository.update(
      id,
      updateEstablishmentDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Establishment with id ${id} not found`);
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.establishmentRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Establishment with id ${id} not found`);
    }
    return { message: `Establishment with id ${id} deleted successfully` };
  }
}
