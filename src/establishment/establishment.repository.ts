import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';

@Injectable()
export class EstablishmentRepository {
  constructor(
    @InjectRepository(Establishment)
    private readonly ormRepository: Repository<Establishment>,
  ) {}

  create(establishment: Partial<Establishment>) {
    return this.ormRepository.create(establishment);
  }

  save(establishment: Establishment) {
    return this.ormRepository.save(establishment);
  }

  findAll() {
    return this.ormRepository.find({
      relations: ['owner', 'products'],
    });
  }

  findOneById(id: string) {
    return this.ormRepository.findOne({ where: { id } });
  }

  update(id: string, updateData: Partial<Establishment>) {
    return this.ormRepository.update(id, updateData);
  }

  delete(id: string) {
    return this.ormRepository.delete(id);
  }
}
