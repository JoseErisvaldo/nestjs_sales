import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ProductResponseDto } from './dto/product.response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const result = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      establishment: { id: createProductDto.establishmentId },
      createdBy: { id: createProductDto.createdById }
    });
  
    const saved = await this.productRepository.save(result);
  
    return plainToInstance(ProductResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      relations: ['establishment', 'createdBy'],
    });

    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['establishment', 'createdBy'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const result = await this.productRepository.update(id, updateProductDto);
    if (!result.affected) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.productRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return { message: `Product ${id} deleted successfully` };
  }
}
