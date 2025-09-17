import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/user.response.dto copy';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto);
    const saved = await this.userRepository.save(user);
    return plainToInstance(UserResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const user = await this.userRepository.findAll();
    if (!user || user.length === 0) {
      throw new NotFoundException('no user found');
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: `User with id ${id} deleted successfully` };
  }

  async findCountUsers(): Promise<number> {
    return this.userRepository.count();
  }

  async findCountEstaUsers() {
    return this.userRepository.findCountEstablishments;
  }
}

/*


SEM REPOSITORY 

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user.response.dto copy';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(
      {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password
      }
    )
    const saved = await this.userRepository.save(user)
    return plainToInstance(UserResponseDto, saved, {
      excludeExtraneousValues:true
    })  
  }

  async findAll(): Promise<UserResponseDto[]> {
    const user = await this.userRepository.find()
    if(!user || user.length === 0) {
      throw new NotFoundException("no user found")

    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues:true
    })
  }

  async findCountUsers(): Promise<number> {
    return this.userRepository.count();
  }
  
  async findCountEstaUsers() {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.establishments', 'establishment')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('user.email', 'userEmail')
      .addSelect('COUNT(establishment.id)', 'totalEstablishments')
      .groupBy('user.id')
      .addGroupBy('user.name')
      .getRawMany();
  
    return result;
  }  

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto)
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return result
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id)
    if(result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return { message: `User with id ${id} deleted successfully` };
  }
}


*/
