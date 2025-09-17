import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.ormRepository.create(user);
  }

  save(user: User) {
    return this.ormRepository.save(user);
  }

  findAll() {
    return this.ormRepository.find();
  }

  findOneById(id: string) {
    return this.ormRepository.findOne({ where: { id } });
  }

  update(id: string, updateData: Partial<User>) {
    return this.ormRepository.update(id, updateData);
  }

  delete(id: string) {
    return this.ormRepository.delete(id);
  }

  count() {
    return this.ormRepository.count();
  }

  async findCountEstablishments() {
    return this.ormRepository
      .createQueryBuilder('user')
      .leftJoin('user.establishments', 'establishment')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('user.email', 'userEmail')
      .addSelect('COUNT(establishment.id)', 'totalEstablishments')
      .groupBy('user.id')
      .addGroupBy('user.name')
      .getRawMany();
  }
}
