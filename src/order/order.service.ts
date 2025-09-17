import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderResponseDto } from './dto/order-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const result = this.orderRepository.create(createOrderDto)
    const saved = await this.orderRepository.save(result)
    return plainToInstance(OrderResponseDto, saved, {
      excludeExtraneousValues: true
    })
  }
  
  async findAll(): Promise<OrderResponseDto[]> {
    const result = await this.orderRepository.find({
      relations: ["user"]
    })
    return plainToInstance(OrderResponseDto, result, {
      excludeExtraneousValues: true
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
